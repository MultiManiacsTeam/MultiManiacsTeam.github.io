(function () {
  "use strict";

  const DATA = AURORA_DATA;

  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  const WARP_RADIUS = 600;
  const WARP_AMP_X = 30;
  const WARP_AMP_Y = 20;
  const WARP_FREQ = 0.022;
  const WARP_SPEED = 1.2;
  const STRIP_H = 3;
  const PAD = 48;

  const DRIFT_SPEED_X = 0.00031;
  const DRIFT_SPEED_Y = 0.00019;

  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  const offscreen = document.createElement("canvas");
  const octx = offscreen.getContext("2d");

  const img1 = new Image();
  const img2 = new Image();
  img1.src = "assets/images/MMbg.png";
  img2.src = "assets/images/MMbg2.png";

  let scrollX = 0,
    scrollY = 0;
  const speedX = 0.04,
    speedY = 0.015;

  let t = 0;
  let transitionProgress = 0;

  let warpCX = 0,
    warpCY = 0;
  let targetCX = 0,
    targetCY = 0;

  window.addEventListener("mousemove", (e) => {
    targetCX = e.clientX;
    targetCY = e.clientY;
  });

  window.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length > 0) {
        targetCX = e.touches[0].clientX;
        targetCY = e.touches[0].clientY;
      }
    },
    { passive: true },
  );

  function resizeCanvas() {
    const w = Math.max(document.documentElement.scrollWidth, window.innerWidth);
    const h = Math.max(
      document.documentElement.scrollHeight,
      window.innerHeight,
    );

    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";

    offscreen.width = w + PAD * 2;
    offscreen.height = h + PAD * 2;

    if (warpCX === 0 && warpCY === 0) {
      warpCX = targetCX = w * 0.5;
      warpCY = targetCY = h * 0.5;
    }

    const scan = document.querySelector(".scanlines");
    if (scan) {
      scan.style.width = w + "px";
      scan.style.height = h + "px";
    }
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  let imagesLoaded = 0;
  function onImgLoad() {
    if (++imagesLoaded === 2) requestAnimationFrame(drawBg);
  }
  img1.onload = onImgLoad;
  img2.onload = onImgLoad;
  img1.onerror = img2.onerror = onImgLoad;

  function drawBg() {
    const motionOff = document.body.classList.contains("motion-disabled");
    const mouseWarpOn = document.body.classList.contains("mouse-warp");
    const W = canvas.width,
      H = canvas.height;

    if (!motionOff) {
      scrollX += speedX;
      scrollY += speedY;
      t += 0.012;

      if (mouseWarpOn) {
        warpCX += (targetCX - warpCX) * 0.1;
        warpCY += (targetCY - warpCY) * 0.1;
      } else {
        targetCX = W * (0.5 + Math.sin(t * DRIFT_SPEED_X * 1000) * 0.38);
        targetCY = H * (0.5 + Math.cos(t * DRIFT_SPEED_Y * 1000) * 0.32);
        warpCX += (targetCX - warpCX) * 0.008;
        warpCY += (targetCY - warpCY) * 0.008;
      }
    }

    octx.clearRect(0, 0, offscreen.width, offscreen.height);

    function drawPatOff(img, alpha) {
      try {
        const pat = octx.createPattern(img, "repeat");
        octx.save();
        octx.globalAlpha = alpha;
        octx.fillStyle = pat;
        octx.setTransform(1, 0, 0, 1, -scrollX + PAD, -scrollY + PAD);
        octx.fillRect(
          scrollX - PAD - W,
          scrollY - PAD - H,
          (W + PAD * 2) * 3,
          (H + PAD * 2) * 3,
        );
        octx.restore();
      } catch (e) {}
    }

    drawPatOff(img1, 0.45);
    if (transitionProgress > 0) drawPatOff(img2, transitionProgress * 0.45);

    ctx.clearRect(0, 0, W, H);

    if (motionOff) {
      ctx.drawImage(offscreen, PAD, PAD, W, H, 0, 0, W, H);
    } else {
      const R2 = WARP_RADIUS * WARP_RADIUS;

      for (let y = 0; y < H; y += STRIP_H) {
        const stripCY = y + STRIP_H * 0.5;
        const dy = stripCY - warpCY;
        const dxEst = W * 0.5 - warpCX;
        const gaussY = Math.exp(-(dy * dy) / R2);
        const gaussX = Math.exp(-(dxEst * dxEst) / (R2 * 2.5));
        const influence = gaussY * (0.25 + gaussX * 0.75);

        const phase = dy * WARP_FREQ + t * WARP_SPEED;
        const xShift = Math.sin(phase) * WARP_AMP_X * influence;
        const yShift = Math.cos(phase * 0.65) * WARP_AMP_Y * influence;

        const srcX = PAD + xShift;
        const srcY = PAD + y + yShift;

        ctx.drawImage(offscreen, srcX, srcY, W, STRIP_H, 0, y, W, STRIP_H);
      }
    }

    requestAnimationFrame(drawBg);
  }

  const motionBtn = document.getElementById("motion-toggle");
  const mouseWarpBtn = document.getElementById("mouse-warp-toggle");
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  let motionOff =
    localStorage.getItem("motionDisabled") === "true" ||
    isMobile ||
    prefersReduced;

  let mouseWarpOn =
    localStorage.getItem("mouseWarpEnabled") === "true" && !isMobile;

  function applyMotion() {
    document.body.classList.toggle("motion-disabled", motionOff);
    motionBtn.textContent = motionOff ? "ENABLE MOTION" : "DISABLE MOTION";
  }

  function applyMouseWarp() {
    document.body.classList.toggle("mouse-warp", mouseWarpOn);
    if (mouseWarpBtn) {
      mouseWarpBtn.textContent = mouseWarpOn ? "WARP: CURSOR" : "WARP: AUTO";
    }
  }

  applyMotion();
  applyMouseWarp();

  motionBtn.addEventListener("click", () => {
    motionOff = !motionOff;
    localStorage.setItem("motionDisabled", motionOff);
    applyMotion();
  });

  if (mouseWarpBtn) {
    mouseWarpBtn.addEventListener("click", () => {
      mouseWarpOn = !mouseWarpOn;
      localStorage.setItem("mouseWarpEnabled", mouseWarpOn);

      if (mouseWarpOn) {
        warpCX = targetCX;
        warpCY = targetCY;
      }
      applyMouseWarp();
    });
  }

  let _huePhase = 0;
  setInterval(() => {
    if (!document.body.classList.contains("motion-disabled")) {
      _huePhase += 0.012;
      const deg = (Math.sin(_huePhase) * 4).toFixed(2);
      canvas.style.filter = `hue-rotate(${deg}deg)`;
    } else {
      canvas.style.filter = "none";
    }
  }, 80);

  class WindowManager {
    constructor() {
      this.windows = new Map();
      this.zTop = 200;
      this.container = document.getElementById("windows-container");
      this.taskbarWins = document.getElementById("tb-windows");
      this.cascadeIndex = 0;
    }

    _cascadePos() {
      const step = 28;
      const maxCascade = 7;
      const idx = this.cascadeIndex % maxCascade;
      this.cascadeIndex++;
      return {
        x: 80 + idx * step,
        y: 55 + idx * step,
      };
    }

    open(config) {
      if (this.windows.has(config.id)) {
        this.focus(config.id);
        return this.windows.get(config.id).el;
      }

      const pos = this._cascadePos();
      const win = document.createElement("div");
      win.className = `aurora-window win-type-${config.type || "default"}`;
      win.id = "win-" + config.id;
      win.style.left = pos.x + "px";
      win.style.top = pos.y + "px";
      if (config.width) win.style.width = config.width + "px";

      win.innerHTML = `
        <div class="win-titlebar">
          <span class="win-title">${esc(config.title)}</span>
          <div class="win-controls">
            <button class="win-btn win-min" title="Minimize">─</button>
            <button class="win-btn win-close" title="Close">✕</button>
          </div>
        </div>
        <div class="win-body"></div>
      `;

      this.container.appendChild(win);

      const bodyEl = win.querySelector(".win-body");
      const titlebarEl = win.querySelector(".win-titlebar");

      config.buildContent(bodyEl);

      win.addEventListener("mousedown", () => this.focus(config.id), true);
      win.addEventListener("touchstart", () => this.focus(config.id), {
        passive: true,
      });

      win.querySelector(".win-close").addEventListener("click", (e) => {
        e.stopPropagation();
        this.close(config.id);
      });
      win.querySelector(".win-min").addEventListener("click", (e) => {
        e.stopPropagation();
        this.minimize(config.id);
      });

      this._makeDraggable(win, titlebarEl);

      const tbBtn = document.createElement("button");
      tbBtn.className = "tb-win-btn";
      tbBtn.textContent =
        config.title.length > 20
          ? config.title.slice(0, 18) + ".."
          : config.title;
      tbBtn.dataset.winId = config.id;
      tbBtn.addEventListener("click", () => {
        const w = this.windows.get(config.id);
        if (!w) return;
        if (w.minimized) this.restore(config.id);
        else this.focus(config.id);
      });
      this.taskbarWins.appendChild(tbBtn);

      this.windows.set(config.id, {
        el: win,
        titlebarEl,
        bodyEl,
        minimized: false,
        tbBtn,
      });
      this.focus(config.id);

      win.classList.add("win-opening");
      setTimeout(() => win.classList.remove("win-opening"), 200);

      resizeCanvas();
      return win;
    }

    close(id) {
      const w = this.windows.get(id);
      if (!w) return;
      w.el.classList.add("win-closing");
      setTimeout(() => {
        w.el.remove();
        w.tbBtn.remove();
        this.windows.delete(id);
        resizeCanvas();
      }, 150);
    }

    minimize(id) {
      const w = this.windows.get(id);
      if (!w) return;
      w.el.style.display = "none";
      w.minimized = true;
      w.tbBtn.classList.add("tb-minimized");
    }

    restore(id) {
      const w = this.windows.get(id);
      if (!w) return;
      w.el.style.display = "";
      w.minimized = false;
      w.tbBtn.classList.remove("tb-minimized");
      this.focus(id);
    }

    focus(id) {
      const w = this.windows.get(id);
      if (!w) return;
      this.zTop++;
      w.el.style.zIndex = this.zTop;

      this.windows.forEach((win, wid) => {
        win.tbBtn.classList.toggle("tb-active", wid === id);
      });
    }

    _makeDraggable(win, handle) {
      let dragging = false;
      let offX = 0,
        offY = 0;

      const start = (cx, cy) => {
        dragging = true;
        const rect = win.getBoundingClientRect();
        offX = cx - rect.left;
        offY = cy - rect.top;
        win.classList.add("dragging");
      };

      const move = (cx, cy) => {
        if (!dragging) return;

        const maxX = window.innerWidth - 60;
        const maxY = window.innerHeight - 30;
        win.style.left = Math.max(0, Math.min(cx - offX, maxX)) + "px";
        win.style.top = Math.max(0, Math.min(cy - offY, maxY)) + "px";
      };

      const end = () => {
        dragging = false;
        win.classList.remove("dragging");
      };

      handle.addEventListener("mousedown", (e) => {
        if (e.target.classList.contains("win-btn")) return;
        e.preventDefault();
        start(e.clientX, e.clientY);
      });

      document.addEventListener("mousemove", (e) => move(e.clientX, e.clientY));
      document.addEventListener("mouseup", end);

      handle.addEventListener(
        "touchstart",
        (e) => {
          if (e.target.classList.contains("win-btn")) return;
          const t = e.touches[0];
          start(t.clientX, t.clientY);
        },
        { passive: true },
      );

      document.addEventListener(
        "touchmove",
        (e) => {
          if (!dragging) return;

          const target = e.target;
          const inScrollable = target.closest(
            ".win-body, .arch-panels, .arch-nav, .lore-sidebar, .lore-main, " +
              ".term-output, .dept-grid, .personnel-grid, .corrupt-content, " +
              ".player-file-list, .player-main, .player-image-wrap, .devlog-nav",
          );
          if (inScrollable) return;
          e.preventDefault();
          const t = e.touches[0];
          move(t.clientX, t.clientY);
        },
        { passive: false },
      );

      document.addEventListener("touchend", end);
    }
  }

  const WM = new WindowManager();

  let _audioCtx = null;

  function getAudioCtx() {
    if (!_audioCtx) {
      _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (_audioCtx.state === "suspended") _audioCtx.resume();
    return _audioCtx;
  }

  let playerLoad = null;

  class ARGSystem {
    constructor() {
      try {
        this.unlocked = JSON.parse(
          localStorage.getItem("mictlan_unlocked") || "{}",
        );
      } catch (e) {
        this.unlocked = {};
      }
      this.lockouts = {};
      this.attempts = {};
    }

    isUnlocked(deptId) {
      return !!this.unlocked[deptId];
    }

    isLockedOut(deptId) {
      const until = this.lockouts[deptId];
      return until && Date.now() < until;
    }

    lockoutRemaining(deptId) {
      const until = this.lockouts[deptId];
      return until ? Math.ceil((until - Date.now()) / 1000) : 0;
    }

    attempt(deptId, nodeId, accessCode) {
      const dept = DATA.DEPARTMENTS.find((d) => d.id === deptId);

      if (!dept || !dept.unlocked) {
        return {
          success: false,
          msg: "SIA: DEPARTMENT NODE IS NOT ACCESSIBLE.",
        };
      }

      if (this.isLockedOut(deptId)) {
        return {
          success: false,
          msg: `SIA: LOCKOUT ACTIVE. WAIT ${this.lockoutRemaining(deptId)}s.`,
        };
      }

      const nOk =
        nodeId.trim().toUpperCase() === dept.credentials.nodeId.toUpperCase();
      const cOk =
        accessCode.trim().toUpperCase() ===
        dept.credentials.accessCode.toUpperCase();

      if (nOk && cOk) {
        this.unlocked[deptId] = true;
        try {
          localStorage.setItem(
            "mictlan_unlocked",
            JSON.stringify(this.unlocked),
          );
        } catch (e) {}
        this.attempts[deptId] = 0;
        return {
          success: true,
          msg: "SIA: AUTHENTICATION SUCCESSFUL. ACCESS GRANTED.",
        };
      }

      this.attempts[deptId] = (this.attempts[deptId] || 0) + 1;
      if (this.attempts[deptId] >= 4) {
        this.lockouts[deptId] = Date.now() + 15000;
        this.attempts[deptId] = 0;
        return {
          success: false,
          msg: "SIA: TOO MANY FAILED ATTEMPTS. LOCKOUT: 15 SECONDS.",
        };
      }

      if (!nOk)
        return { success: false, msg: "SIA: INVALID NODE ID. ACCESS DENIED." };
      return {
        success: false,
        msg: "SIA: INVALID ACCESS CODE. ACCESS DENIED.",
      };
    }
  }

  const ARG = new ARGSystem();

  function renderLoreContent(content) {
    if (!Array.isArray(content)) {
      return content
        .split("\n")
        .map(
          (l) => `<div class="lore-line">${renderInline(l) || "&nbsp;"}</div>`,
        )
        .join("");
    }

    return content
      .map((entry) => {
        if (entry === "" || entry === null || entry === undefined) {
          return '<div class="lore-blank">&nbsp;</div>';
        }
        if (typeof entry === "string") {
          if (entry.startsWith("──"))
            return `<div class="lore-sep">${esc(entry)}</div>`;
          return `<div class="lore-line">${renderInline(entry)}</div>`;
        }
        if (typeof entry === "object") {
          if (entry.type === "system") {
            return `<div class="lore-system">SYSTEM: ${renderInline(entry.msg)}</div>`;
          }
          if (entry.type === "flag") {
            return `<div class="lore-flag">[${renderInline(entry.msg)}]</div>`;
          }
          if (entry.speaker) {
            const sp = esc(entry.speaker);
            const cls = entry.speaker.startsWith("SIA")
              ? "lore-sia"
              : entry.speaker.startsWith("Lt.")
                ? "lore-lt"
                : entry.speaker.startsWith("Dr.")
                  ? "lore-dr"
                  : "lore-other";
            const msgLines = entry.msg
              .split("\n")
              .map((l) => renderInline(l))
              .join("<br>");
            return `<div class="lore-chat ${cls}"><span class="lore-speaker">${sp}:</span><span class="lore-msg">${msgLines}</span></div>`;
          }
        }
        return "";
      })
      .join("");
  }

  function renderInline(text) {
    return esc(text).replace(
      /\[REDACTED\]/g,
      '<span class="lore-redacted">████████</span>',
    );
  }

  function buildArchive(body) {
    body.className = "win-body win-body-archive";
    const nav = DATA.ARCHIVE.sections
      .map(
        (s, i) =>
          `<button class="arch-nav-btn ${i === 0 ? "active" : ""}" data-idx="${i}">${esc(s.title.replace("// ", ""))}</button>`,
      )
      .join("");
    const panels = DATA.ARCHIVE.sections
      .map((s, i) => {
        const lineChunks = [];
        const asciiRx = /\[ASCII\]([\s\S]*?)\[\/ASCII\]/g;
        let lastIdx = 0,
          m;
        const raw = s.content;

        while ((m = asciiRx.exec(raw)) !== null) {
          raw
            .slice(lastIdx, m.index)
            .split("\n")
            .forEach((l) => {
              if (!l.trim()) lineChunks.push("<br>");
              else if (l.startsWith("►"))
                lineChunks.push(`<div class="arch-action">${esc(l)}</div>`);
              else lineChunks.push(`<div class="arch-line">${esc(l)}</div>`);
            });

          lineChunks.push(`<pre class="arch-ascii">${esc(m[1])}</pre>`);
          lastIdx = m.index + m[0].length;
        }

        raw
          .slice(lastIdx)
          .split("\n")
          .forEach((l) => {
            if (!l.trim()) lineChunks.push("<br>");
            else if (l.startsWith("►"))
              lineChunks.push(`<div class="arch-action">${esc(l)}</div>`);
            else lineChunks.push(`<div class="arch-line">${esc(l)}</div>`);
          });

        const lines = lineChunks.join("");

        return `<div class="arch-panel ${i === 0 ? "active" : ""}" data-idx="${i}">
        <h3 class="arch-title">${esc(s.title)}</h3>
        <div class="arch-content">${lines}</div>
${
  s.links
    ? s.links
        .map(
          (link) => `
  <a class="warp-link" href="${esc(link.href)}" target="_blank" rel="noopener">
    ${esc(link.label)} ↗
  </a>`,
        )
        .join("")
    : ""
}
        </div>`;
      })
      .join("");

    body.innerHTML = `
      <div class="arch-layout">
        <nav class="arch-nav">${nav}</nav>
        <div class="arch-panels">${panels}</div>
      </div>`;

    body.querySelectorAll(".arch-nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = btn.dataset.idx;
        body
          .querySelectorAll(".arch-nav-btn")
          .forEach((b) => b.classList.toggle("active", b.dataset.idx === idx));
        body
          .querySelectorAll(".arch-panel")
          .forEach((p) => p.classList.toggle("active", p.dataset.idx === idx));
      });
    });
  }

  function buildPersonnel(body) {
    body.className = "win-body win-body-personnel";
    const rows = DATA.PERSONNEL.map(
      (p) => `
      <div class="personnel-card">
        <div class="personnel-handle">${esc(p.handle)}</div>
        <div class="personnel-role">${esc(p.role)}</div>
        <div class="personnel-meta">
          <span class="personnel-clr">CLEARANCE: ${esc(p.clearance)}</span>
          <span class="personnel-status ${p.status === "ACTIVE" ? "status-online" : "status-offline"}">${esc(p.status)}</span>
        </div>
        <div class="personnel-note">${esc(p.note)}</div>
      </div>`,
    ).join("");

    body.innerHTML = `
      <div class="personnel-header">PERSONNEL.sys - ${DATA.PERSONNEL.length} RECORD(S)</div>
      <div class="personnel-grid">${rows}</div>`;
  }

  function buildDepartments(body) {
    body.className = "win-body win-body-departments";

    function renderGrid() {
      const cards = DATA.DEPARTMENTS.map((dept) => {
        const isUnlocked = ARG.isUnlocked(dept.id);
        const statusClass =
          {
            ONLINE: "dept-online",
            LOCKED: "dept-locked",
            OFFLINE: "dept-offline",
            PENDING: "dept-pending",
          }[dept.status] || "dept-pending";

        let btnLabel = "CONNECT";
        let btnDisabled = "";
        if (dept.status === "PENDING" || dept.status === "OFFLINE") {
          btnLabel = dept.status === "OFFLINE" ? "OFFLINE" : "PENDING";
          btnDisabled = "disabled";
        } else if (isUnlocked) {
          btnLabel = "VIEW FILES";
        }

        return `<div class="dept-card ${statusClass}" data-id="${esc(dept.id)}">
          <div class="dept-header">
            <span class="dept-indicator"></span>
            <span class="dept-name">${esc(dept.name)}</span>
          </div>
          <div class="dept-full">${esc(dept.fullName)}</div>
          <div class="dept-lt">${esc(dept.lieutenant)}</div>
          <button class="dept-btn" data-dept="${esc(dept.id)}" ${btnDisabled}>${btnLabel}</button>
        </div>`;
      }).join("");

      body.innerHTML = `
        <div class="dept-header-bar">DEPT_NODES.sys - ${DATA.DEPARTMENTS.length} NODE(S) INDEXED</div>
        <div class="dept-grid">${cards}</div>`;

      body.querySelectorAll(".dept-btn:not([disabled])").forEach((btn) => {
        btn.addEventListener("click", () => {
          const deptId = btn.dataset.dept;
          const dept = DATA.DEPARTMENTS.find((d) => d.id === deptId);
          if (!dept) return;

          if (ARG.isUnlocked(deptId)) {
            openLore(dept);
          } else {
            openLogin(dept, () => {
              renderGrid();
              openLore(dept);
            });
          }
        });
      });
    }

    renderGrid();
  }

  function openLogin(dept, onSuccess) {
    const winId = "login-" + dept.id;

    WM.open({
      id: winId,
      title: `ACCESSING NODE // AUTH - ${dept.name}`,
      type: "terminal",
      width: 460,
      buildContent(body) {
        body.className = "win-body win-body-login";
        body.innerHTML = `
          <div class="login-dept">${esc(dept.fullName)}</div>
          <div class="login-status">STATUS: <span class="${dept.status === "ONLINE" ? "c-online" : "c-locked"}">${esc(dept.status)}</span></div>
          <div class="login-field">
            <label>NODE ID</label>
            <input id="login-node-${esc(dept.id)}" class="login-input" type="text" placeholder="ENTER NODE ID" autocomplete="off" spellcheck="false" />
          </div>
          <div class="login-field">
            <label>ACCESS CODE</label>
            <input id="login-code-${esc(dept.id)}" class="login-input" type="password" placeholder="ENTER ACCESS CODE" autocomplete="off" />
          </div>
          <button class="login-submit" id="login-submit-${esc(dept.id)}">AUTHENTICATE</button>
          <div class="login-response" id="login-resp-${esc(dept.id)}"></div>
          <div class="login-hint">POWERED BY PONTO.</div>`;

        const submitBtn = body.querySelector(`#login-submit-${dept.id}`);
        const respEl = body.querySelector(`#login-resp-${dept.id}`);
        const nodeEl = body.querySelector(`#login-node-${dept.id}`);
        const codeEl = body.querySelector(`#login-code-${dept.id}`);

        function doAttempt() {
          const result = ARG.attempt(dept.id, nodeEl.value, codeEl.value);
          respEl.textContent = result.msg;
          respEl.className =
            "login-response " + (result.success ? "resp-ok" : "resp-fail");

          if (result.success) {
            submitBtn.disabled = true;
            setTimeout(() => {
              WM.close(winId);
              onSuccess && onSuccess();
            }, 1200);
          }
        }

        submitBtn.addEventListener("click", doAttempt);
        [nodeEl, codeEl].forEach((el) => {
          el.addEventListener("keydown", (e) => {
            if (e.key === "Enter") doAttempt();
          });
        });
      },
    });
  }

  function openLore(dept) {
    const winId = "lore-" + dept.id;
    WM.open({
      id: winId,
      title: `INTERCEPTED - ${dept.name} // ${dept.lieutenant}`,
      type: "default",
      width: 740,
      buildContent(body) {
        body.className = "win-body win-body-lore";

        if (!dept.lore || dept.lore.length === 0) {
          body.innerHTML =
            '<div class="lore-empty">SIA: NO RECOVERABLE FILES IN THIS SECTOR.</div>';
          return;
        }

        const fileList = dept.lore
          .map(
            (doc, i) =>
              `<button class="lore-file-btn ${i === 0 ? "active" : ""}" data-idx="${i}">${esc(doc.label)}</button>`,
          )
          .join("");

        const viewers = dept.lore
          .map(
            (doc, i) => `
          <div class="lore-viewer ${i === 0 ? "active" : ""}" data-idx="${i}">
            <div class="lore-meta">
              <span class="lore-class ${doc.classification.includes("RESTRICTED") ? "class-restricted" : doc.classification.includes("FLAGGED") ? "class-flagged" : "class-normal"}">${esc(doc.classification)}</span>
              <span class="lore-cycle">${esc(doc.cycle)}</span>
              <span class="lore-author">FROM: ${esc(doc.author)}</span>
            </div>
            <h3 class="lore-doc-title">${esc(doc.title)}</h3>
            <div class="lore-body">${renderLoreContent(doc.content)}</div>
          </div>`,
          )
          .join("");

        body.innerHTML = `
          <div class="lore-layout">
            <div class="lore-sidebar">
              <div class="lore-sidebar-hdr">FILES - ${dept.lore.length}</div>
              ${fileList}
            </div>
            <div class="lore-main">${viewers}</div>
          </div>`;

        body.querySelectorAll(".lore-file-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            const idx = btn.dataset.idx;
            body
              .querySelectorAll(".lore-file-btn")
              .forEach((b) =>
                b.classList.toggle("active", b.dataset.idx === idx),
              );
            body
              .querySelectorAll(".lore-viewer")
              .forEach((v) =>
                v.classList.toggle("active", v.dataset.idx === idx),
              );
          });
        });
      },
    });
  }

  function buildTerminal(body) {
    body.className = "win-body win-body-terminal";
    body.innerHTML = `
      <div class="term-output" id="term-output"></div>
      <div class="term-input-row">
        <span class="term-prompt">GUEST@CTR-NEXUS:~$</span>
        <input id="term-input" class="term-input" type="text" autocomplete="off" spellcheck="false" />
      </div>`;

    const output = body.querySelector("#term-output");
    const input = body.querySelector("#term-input");
    let history = [];
    let histIdx = -1;

    function print(lines, className) {
      (Array.isArray(lines) ? lines : [lines]).forEach((line) => {
        const el = document.createElement("div");
        el.className = "term-line " + (className || "");
        el.textContent = line;
        output.appendChild(el);
      });
      requestAnimationFrame(() => {
        output.scrollTop = output.scrollHeight;
      });
    }

    function printCmd(cmd) {
      const el = document.createElement("div");
      el.className = "term-line term-cmd";
      el.textContent = `GUEST@CTR-NEXUS:~$ ${cmd}`;
      output.appendChild(el);
      requestAnimationFrame(() => {
        output.scrollTop = output.scrollHeight;
      });
    }

    print([
      "TERMINAL INTERFACE - AURORA OS v." + DATA.SYSTEM.version,
      'TYPE "help" FOR AVAILABLE COMMANDS.',
      "",
    ]);

    function processCommand(raw) {
      const trimmed = raw.trim();
      if (!trimmed) return;

      history.unshift(trimmed);
      histIdx = -1;
      printCmd(trimmed);

      const parts = trimmed.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      if (cmd === "clear") {
        output.innerHTML = "";
        return;
      }

      if (cmd === "ping") {
        const node = (args[0] || "").toLowerCase();
        const resp =
          DATA.TERMINAL_PING[node] ||
          DATA.TERMINAL_PING_DEFAULT.map((l) =>
            l.replace("[TARGET]", node || "???"),
          );
        print(resp, "term-ping");
        return;
      }

      if (cmd === "open") {
        const name = args.join(" ").toUpperCase();
        print(
          [
            `ATTEMPTING TO OPEN: ${name}`,
            "ACCESS DENIED. INSUFFICIENT CLEARANCE.",
            "SIA: UNAUTHORIZED FILE ACCESS ATTEMPT LOGGED.",
          ],
          "term-error",
        );
        return;
      }

      if (cmd === "status") {
        const lines = [
          "DEPARTMENT NODE STATUS OVERVIEW:",
          "────────────────────────────────────────────────",
        ];
        DATA.DEPARTMENTS.forEach((d) => {
          const unlocked = ARG.isUnlocked(d.id) ? " [BREACHED]" : "";
          lines.push(
            `  ${d.name.padEnd(12)} ${d.fullName.padEnd(40)} ${d.status}${unlocked}`,
          );
        });
        lines.push("────────────────────────────────────────────────");
        print(lines, "term-status");
        return;
      }

      const cmdData = DATA.TERMINAL_COMMANDS[cmd];
      if (cmdData && cmdData.response) {
        print(cmdData.response, "term-resp");
      } else {
        print(DATA.TERMINAL_UNKNOWN, "term-error");
      }
    }

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        processCommand(input.value);
        input.value = "";
      } else if (e.key === "ArrowUp") {
        histIdx = Math.min(histIdx + 1, history.length - 1);
        input.value = history[histIdx] || "";
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        histIdx = Math.max(histIdx - 1, -1);
        input.value = histIdx === -1 ? "" : history[histIdx];
        e.preventDefault();
      }
    });

    body.addEventListener("click", () => input.focus());
    body.addEventListener("touchend", () => input.focus(), { passive: true });
    if (!isMobile) setTimeout(() => input.focus(), 50);
  }

  function buildCorrupted(body) {
    body.className = "win-body win-body-corrupted";
    const lines = DATA.CORRUPTED_LINES.map((l) => {
      if (!l) return '<div class="corrupt-blank">&nbsp;</div>';

      const escaped = esc(l).replace(
        /AVASA/g,
        '<span class="corrupt-key">AVASA</span>',
      );
      return `<div class="corrupt-line">${escaped}</div>`;
    }).join("");
    body.innerHTML = `<div class="corrupt-content">${lines}</div>`;
  }

  function parseInlineMarkup(raw) {
    const allowedColors = new Set(["GREEN", "RED", "CYAN", "YELLOW", "WHITE"]);
    const tagRegex = /\[(\w+)\](.*?)\[\/\1\]/gi;

    return raw.replace(tagRegex, (match, color, inner) => {
      if (!allowedColors.has(color.toUpperCase())) {
        return esc(match);
      }
      const innerParsed = parseInlineMarkup(inner);
      return `<span class="h-${color.toLowerCase()}">${innerParsed}</span>`;
    });
  }

  function buildDevlogContent(content) {
    if (!content) return "";

    const chunks = [];
    const asciiRx = /\[ASCII\]([\s\S]*?)\[\/ASCII\]/g;
    let lastIdx = 0;
    let m;

    function processTextBlock(block) {
      block.split("\n").forEach((l) => {
        if (!l.trim()) {
          chunks.push("<br>");
        } else if (l.startsWith("► ")) {
          chunks.push(`<div class="arch-action">${parseInlineMarkup(l)}</div>`);
        } else if (l.startsWith("> ")) {
          chunks.push(
            `<div class="arch-line-note">${parseInlineMarkup(l)}</div>`,
          );
        } else {
          chunks.push(`<div class="arch-line">${parseInlineMarkup(l)}</div>`);
        }
      });
    }

    while ((m = asciiRx.exec(content)) !== null) {
      processTextBlock(content.slice(lastIdx, m.index));
      chunks.push(`<pre class="arch-ascii">${esc(m[1])}</pre>`);
      lastIdx = m.index + m[0].length;
    }

    processTextBlock(content.slice(lastIdx));

    return chunks.join("");
  }

  function buildDevlogs(body) {
    body.className = "win-body win-body-devlogs";

    const devlogs = (DATA.DEVLOGS || [])
      .slice()
      .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

    if (!devlogs.length) {
      body.innerHTML = '<div class="lore-empty">NO DEVLOG ENTRIES FOUND.</div>';
      return;
    }

    const navItems = devlogs
      .map(
        (dl, i) => `
      <button class="arch-nav-btn ${i === 0 ? "active" : ""}" data-idx="${i}">
        ${esc(dl.title)}
        <span class="devlog-nav-date">${esc(dl.date)}</span>
      </button>`,
      )
      .join("");

    const panels = devlogs
      .map((dl, i) => {
        const contentHtml = buildDevlogContent(dl.content);

        let attachHtml = "";
        if (dl.attachments && dl.attachments.length > 0) {
          const fileCards = dl.attachments
            .map((fid) => {
              const f = (DATA.MEDIA_LIBRARY || []).find((m) => m.id === fid);
              if (!f) return "";
              const icon = f.type === "audio" ? "♫" : "▣";
              return `<button class="devlog-attachment" data-media-id="${esc(f.id)}">
            <span class="devlog-att-icon">${icon}</span>
            <span class="devlog-att-info">
              <span class="devlog-att-name">${esc(f.filename)}</span>
              <span class="devlog-att-type">${esc(f.type.toUpperCase())} - ${esc(f.releaseCycle)}</span>
            </span>
          </button>`;
            })
            .join("");

          attachHtml = `<div class="devlog-attachments">
          <div class="devlog-attachments-hdr">── ATTACHMENTS ───────────────────────────</div>
          <div class="devlog-attachment-grid">${fileCards}</div>
        </div>`;
        }

        return `<div class="arch-panel ${i === 0 ? "active" : ""}" data-idx="${i}">
        <div class="devlog-panel-header">
          <h3 class="arch-title">${esc(dl.title)}</h3>
          <div class="devlog-meta">
            <span class="devlog-date">${esc(dl.date)}</span>
            <span class="devlog-author">${esc(dl.author)}</span>
          </div>
        </div>
        <div class="arch-content">${contentHtml}</div>
        ${attachHtml}
      </div>`;
      })
      .join("");

    body.innerHTML = `
      <div class="arch-layout">
        <nav class="arch-nav devlog-nav">${navItems}</nav>
        <div class="arch-panels">${panels}</div>
      </div>`;

    const panelsContainer = body.querySelector(".arch-panels");

    body.querySelectorAll(".arch-nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = btn.dataset.idx;
        body
          .querySelectorAll(".arch-nav-btn")
          .forEach((b) => b.classList.toggle("active", b.dataset.idx === idx));
        body
          .querySelectorAll(".arch-panel")
          .forEach((p) => p.classList.toggle("active", p.dataset.idx === idx));

        if (panelsContainer) {
          panelsContainer.scrollTop = 0;
        }
      });
    });

    body.querySelectorAll(".devlog-attachment").forEach((btn) => {
      btn.addEventListener("click", () => {
        ACTIONS.openMediaPlayer(btn.dataset.mediaId);
      });
    });
  }

  function buildMediaPlayer(body, initialFileId) {
    body.className = "win-body win-body-player";

    let sortMode = "date";
    let filterMode = "all";
    let activeFileId = null;
    let audioEl = null;
    let stopCurrentSource = null;
    let isPlaying = false;
    let repeatOn = false;
    let zoomLevel = 1.0;
    const MIN_ZOOM = 0.2;
    const MAX_ZOOM = 4.0;

    const totalFiles = (DATA.MEDIA_LIBRARY || []).length;

    body.innerHTML = `
      <div class="player-layout">
        <div class="player-sidebar">
          <div class="player-ctrl-bar">
            <div class="player-ctrl-row">
              <span class="player-ctrl-label">SORT</span>
              <button class="player-ctrl-btn active" data-sort="date">DATE</button>
              <button class="player-ctrl-btn" data-sort="name">NAME</button>
            </div>
            <div class="player-ctrl-row">
              <span class="player-ctrl-label">TYPE</span>
              <button class="player-ctrl-btn active" data-filter="all">ALL</button>
              <button class="player-ctrl-btn" data-filter="audio">AUDIO</button>
              <button class="player-ctrl-btn" data-filter="image">IMAGE</button>
              <button class="player-ctrl-btn" data-filter="video">VIDEO</button>
            </div>
          </div>
          <div class="player-file-list" id="player-file-list"></div>
        </div>
        <div class="player-main" id="player-main">
          <div class="player-empty">
            <div class="player-empty-icon">SIA</div>
            <div class="player-empty-text">SELECT A FILE</div>
            <div class="player-empty-sub">SIA_PLAYER.sys - ${totalFiles} FILE(S) IN LIBRARY</div>
          </div>
        </div>
      </div>`;

    const fileListEl = body.querySelector("#player-file-list");
    const mainEl = body.querySelector("#player-main");

    function getFiltered() {
      let files = (DATA.MEDIA_LIBRARY || []).filter((f) =>
        filterMode === "all" ? true : f.type === filterMode,
      );
      if (sortMode === "name") {
        files.sort((a, b) => a.filename.localeCompare(b.filename));
      } else {
        files.sort((a, b) => {
          const nA = parseInt((a.releaseCycle || "").replace(/\D/g, "")) || 0;
          const nB = parseInt((b.releaseCycle || "").replace(/\D/g, "")) || 0;
          return nB - nA;
        });
      }
      return files;
    }

    function renderFileList() {
      const files = getFiltered();
      if (!files.length) {
        fileListEl.innerHTML =
          '<div class="player-file-empty">NO FILES MATCH FILTER.</div>';
        return;
      }
      fileListEl.innerHTML = files
        .map((f) => {
          const icon = f.type === "audio" ? "♫" : "▣";
          const active = f.id === activeFileId ? "active" : "";
          return `<button class="player-file-btn ${active}" data-id="${esc(f.id)}">
          <span class="player-file-icon">${icon}</span>
          <span class="player-file-info">
            <span class="player-file-name">${esc(f.filename)}</span>
            <span class="player-file-cycle">${esc(f.releaseCycle)}</span>
          </span>
        </button>`;
        })
        .join("");
      fileListEl.querySelectorAll(".player-file-btn").forEach((btn) => {
        btn.addEventListener("click", () => loadFile(btn.dataset.id));
      });
    }

    function stopMedia() {
      if (stopCurrentSource) {
        stopCurrentSource();
        stopCurrentSource = null;
      }
      if (audioEl) {
        audioEl.pause();
        audioEl.src = "";
        audioEl = null;
      }
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      const videoEl = document.getElementById("player-video-el");
      if (videoEl) {
        videoEl.pause();
        videoEl.removeAttribute("src");
        videoEl.load();
      }
      isPlaying = false;
    }

    function formatTime(s) {
      if (!isFinite(s)) return "--:--";
      const m = Math.floor(s / 60);
      return (
        String(m).padStart(2, "0") +
        ":" +
        String(Math.floor(s % 60)).padStart(2, "0")
      );
    }

    function loadFile(fileId) {
      const file = (DATA.MEDIA_LIBRARY || []).find((f) => f.id === fileId);
      if (!file) return;
      stopMedia();
      zoomLevel = 1.0;
      activeFileId = fileId;
      renderFileList();
      if (file.type === "audio") renderAudio(file);
      else if (file.type === "image") renderImage(file);
      else if (file.type === "video") renderVideo(file);
    }

    playerLoad = loadFile;

    function renderAudio(file) {
      mainEl.innerHTML = `
        <div class="player-stage">
          <div class="player-stage-meta">
            <div class="player-stage-filename">${esc(file.filename)}</div>
            <div class="player-stage-detail">
              <span class="player-stage-class">${esc(file.classification)}</span>
              <span class="player-stage-cycle">${esc(file.releaseCycle)}</span>
            </div>
            ${file.description ? `<div class="player-stage-desc">${esc(file.description)}</div>` : ""}
          </div>
          <div class="player-bars" id="player-bars"></div>
          <div class="player-progress-wrap" id="player-progress-wrap">
            <div class="player-progress-fill" id="player-progress-fill"></div>
          </div>
          <div class="player-time-row">
            <span id="player-time-cur">00:00</span>
            <span class="player-time-sep">/</span>
            <span id="player-time-dur">--:--</span>
          </div>
          <div class="player-audio-btns">
            <button class="player-action-btn" id="player-pp">PLAY</button>
            <button class="player-action-btn" id="player-stop">STOP</button>
            <button class="player-action-btn player-repeat-btn" id="player-repeat">REPEAT: OFF</button>
          </div>
          <div class="player-load-status" id="player-load-status">DECODING AUDIO...</div>
        </div>`;

      const BAR_COUNT = 32;
      const barsEl = mainEl.querySelector("#player-bars");
      const barEls = [];

      for (let i = 0; i < BAR_COUNT; i++) {
        const b = document.createElement("div");
        b.className = "player-bar";
        b.style.height = "8%";
        barsEl.appendChild(b);
        barEls.push(b);
      }

      const ppBtn = mainEl.querySelector("#player-pp");
      const stopBtn = mainEl.querySelector("#player-stop");
      const repeatBtn = mainEl.querySelector("#player-repeat");
      const progWrap = mainEl.querySelector("#player-progress-wrap");
      const progFill = mainEl.querySelector("#player-progress-fill");
      const timeCur = mainEl.querySelector("#player-time-cur");
      const timeDur = mainEl.querySelector("#player-time-dur");
      const loadStatus = mainEl.querySelector("#player-load-status");

      let audioBuffer = null;
      let sourceNode = null;
      let gainNode = null;
      let analyserNode = null;
      let freqData = null;
      let startCtxTime = 0;
      let startOffset = 0;
      let rafId = null;
      let duration = 0;

      stopCurrentSource = () => {
        if (sourceNode) {
          try {
            sourceNode.stop();
          } catch (e) {}
          sourceNode.disconnect();
          sourceNode = null;
        }
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      };

      function getElapsed() {
        const ac = getAudioCtx();
        let elapsed = ac.currentTime - startCtxTime + startOffset;
        if (repeatOn && duration > 0) elapsed = elapsed % duration;
        return Math.max(0, Math.min(elapsed, duration));
      }

      function resetBars() {
        barEls.forEach((b) => {
          b.style.height = "8%";
        });
      }

      function resetVisuals() {
        progFill.style.width = "0%";
        timeCur.textContent = "00:00";
        resetBars();
      }

      function animLoop() {
        if (!isPlaying) return;

        if (duration) {
          const elapsed = getElapsed();
          progFill.style.width = (elapsed / duration) * 100 + "%";
          timeCur.textContent = formatTime(elapsed);
        }

        if (analyserNode && freqData) {
          analyserNode.getByteFrequencyData(freqData);

          const binCount = freqData.length;
          for (let i = 0; i < BAR_COUNT; i++) {
            const t = i / (BAR_COUNT - 1);
            const logT = Math.pow(t, 0.6);
            const bin = Math.min(Math.floor(logT * binCount), binCount - 1);
            const value = freqData[bin] / 255;
            barEls[i].style.height = 8 + value * 88 + "%";
          }
        }

        rafId = requestAnimationFrame(animLoop);
      }

      function createAndStart(offset) {
        if (!audioBuffer) return;
        const ac = getAudioCtx();

        if (sourceNode) {
          sourceNode.onended = null;
          try {
            sourceNode.stop();
          } catch (e) {}
          sourceNode.disconnect();
        }

        if (!gainNode) {
          gainNode = ac.createGain();
          analyserNode = ac.createAnalyser();
          analyserNode.fftSize = 256;
          analyserNode.smoothingTimeConstant = 0.1;
          freqData = new Uint8Array(analyserNode.frequencyBinCount);
          analyserNode.connect(gainNode);
          gainNode.connect(ac.destination);
        }

        sourceNode = ac.createBufferSource();
        sourceNode.buffer = audioBuffer;
        sourceNode.loop = repeatOn;
        sourceNode.connect(analyserNode);

        startCtxTime = ac.currentTime;
        startOffset = offset;
        sourceNode.start(0, offset);

        sourceNode.onended = () => {
          if (!isPlaying) return;
          isPlaying = false;
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
          ppBtn.textContent = "PLAY";
          resetVisuals();
        };
      }

      fetch(file.path)
        .then((r) => {
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.arrayBuffer();
        })
        .then((buf) => getAudioCtx().decodeAudioData(buf))
        .then((decoded) => {
          audioBuffer = decoded;
          duration = decoded.duration;
          timeDur.textContent = formatTime(duration);
          loadStatus.style.display = "none";
          ppBtn.disabled = false;
        })
        .catch((err) => {
          loadStatus.textContent = "DECODE FAILED: " + String(err);
          loadStatus.style.color = "var(--c-red)";
        });

      ppBtn.disabled = true;

      ppBtn.addEventListener("click", () => {
        if (!audioBuffer) return;

        if (isPlaying) {
          startOffset = getElapsed();
          if (sourceNode) {
            try {
              sourceNode.stop();
            } catch (e) {}
            sourceNode.disconnect();
            sourceNode = null;
          }
          isPlaying = false;
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
          ppBtn.textContent = "PLAY";
        } else {
          createAndStart(startOffset);
          isPlaying = true;
          ppBtn.textContent = "PAUSE";
          rafId = requestAnimationFrame(animLoop);
        }
      });

      stopBtn.addEventListener("click", () => {
        if (sourceNode) {
          try {
            sourceNode.stop();
          } catch (e) {}
          sourceNode.disconnect();
          sourceNode = null;
        }
        isPlaying = false;
        startOffset = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        ppBtn.textContent = "PLAY";
        resetVisuals();
      });

      progWrap.addEventListener("click", (e) => {
        if (!duration) return;
        const rect = progWrap.getBoundingClientRect();
        startOffset = Math.max(
          0,
          Math.min(((e.clientX - rect.left) / rect.width) * duration, duration),
        );

        if (isPlaying) {
          createAndStart(startOffset);
        } else {
          progFill.style.width = (startOffset / duration) * 100 + "%";
          timeCur.textContent = formatTime(startOffset);
        }
      });

      repeatBtn.addEventListener("click", () => {
        repeatOn = !repeatOn;
        repeatBtn.textContent = repeatOn ? "REPEAT: ON" : "REPEAT: OFF";
        repeatBtn.classList.toggle("active", repeatOn);
        if (sourceNode) sourceNode.loop = repeatOn;
      });
    }

    function renderImage(file) {
      mainEl.innerHTML = `
        <div class="player-stage player-stage-image">
          <div class="player-stage-meta">
            <div class="player-stage-filename">${esc(file.filename)}</div>
            <div class="player-stage-detail">
              <span class="player-stage-class">${esc(file.classification)}</span>
              <span class="player-stage-cycle">${esc(file.releaseCycle)}</span>
            </div>
            ${file.description ? `<div class="player-stage-desc">${esc(file.description)}</div>` : ""}
          </div>
          <div class="player-image-controls">
            <button class="player-action-btn" id="player-zoom-out">─</button>
            <span class="player-zoom-label" id="player-zoom-label">100%</span>
            <button class="player-action-btn" id="player-zoom-in">+</button>
            <button class="player-action-btn" id="player-zoom-reset">RESET</button>
          </div>
          <div class="player-image-wrap" id="player-image-wrap">
            <img src="${esc(file.path)}" alt="${esc(file.filename)}"
                 class="player-image" id="player-img" draggable="false" />
          </div>
        </div>`;

      const imgWrap = mainEl.querySelector("#player-image-wrap");
      const imgEl = mainEl.querySelector("#player-img");
      const zoomLbl = mainEl.querySelector("#player-zoom-label");

      let natW = 0;
      let natH = 0;

      function applyZoom() {
        if (!natW) return;
        imgEl.style.width = Math.round(natW * zoomLevel) + "px";
        imgEl.style.height = Math.round(natH * zoomLevel) + "px";
        zoomLbl.textContent = Math.round(zoomLevel * 100) + "%";
      }

      imgEl.addEventListener("load", () => {
        natW = imgEl.naturalWidth || imgEl.width || 400;
        natH = imgEl.naturalHeight || imgEl.height || 300;

        const fitZoom = Math.min(
          imgWrap.clientWidth / natW,
          imgWrap.clientHeight / natH,
        );
        zoomLevel = Math.min(Math.max(fitZoom, MIN_ZOOM), MAX_ZOOM);

        applyZoom();
      });

      mainEl.querySelector("#player-zoom-in").addEventListener("click", () => {
        zoomLevel = Math.min(
          MAX_ZOOM,
          parseFloat((zoomLevel + 0.25).toFixed(2)),
        );
        applyZoom();
      });
      mainEl.querySelector("#player-zoom-out").addEventListener("click", () => {
        zoomLevel = Math.max(
          MIN_ZOOM,
          parseFloat((zoomLevel - 0.25).toFixed(2)),
        );
        applyZoom();
      });
      mainEl
        .querySelector("#player-zoom-reset")
        .addEventListener("click", () => {
          zoomLevel = 1.0;
          applyZoom();
        });

      imgWrap.addEventListener(
        "wheel",
        (e) => {
          e.preventDefault();
          const delta = e.deltaY < 0 ? 0.12 : -0.12;
          const prevZoom = zoomLevel;
          zoomLevel = Math.min(
            MAX_ZOOM,
            Math.max(MIN_ZOOM, parseFloat((zoomLevel + delta).toFixed(2))),
          );

          const rect = imgWrap.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          const ratio = zoomLevel / prevZoom;
          const scrollX = (imgWrap.scrollLeft + mouseX) * ratio - mouseX;
          const scrollY = (imgWrap.scrollTop + mouseY) * ratio - mouseY;

          applyZoom();
          imgWrap.scrollLeft = scrollX;
          imgWrap.scrollTop = scrollY;
        },
        { passive: false },
      );

      let isPanning = false;
      let panStartX = 0,
        panStartY = 0;
      let scrollStartX = 0,
        scrollStartY = 0;

      let pinchPointers = new Map();
      let pinchStartDist = 0;
      let pinchStartZoom = 1;

      function getPinchDist() {
        const pts = [...pinchPointers.values()];
        const dx = pts[1].x - pts[0].x;
        const dy = pts[1].y - pts[0].y;
        return Math.sqrt(dx * dx + dy * dy);
      }

      function getPinchMid() {
        const pts = [...pinchPointers.values()];
        return {
          x: (pts[0].x + pts[1].x) / 2,
          y: (pts[0].y + pts[1].y) / 2,
        };
      }

      imgWrap.addEventListener("pointerdown", (e) => {
        pinchPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        imgWrap.setPointerCapture(e.pointerId);

        if (pinchPointers.size === 2) {
          isPanning = false;
          pinchStartDist = getPinchDist();
          pinchStartZoom = zoomLevel;
        } else if (pinchPointers.size === 1) {
          if (e.button !== undefined && e.button !== 0) return;
          isPanning = true;
          panStartX = e.clientX;
          panStartY = e.clientY;
          scrollStartX = imgWrap.scrollLeft;
          scrollStartY = imgWrap.scrollTop;
          imgWrap.style.cursor = "grabbing";
        }
        e.preventDefault();
      });

      imgWrap.addEventListener("pointermove", (e) => {
        if (!pinchPointers.has(e.pointerId)) return;
        pinchPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (pinchPointers.size === 2) {
          const dist = getPinchDist();
          const mid = getPinchMid();
          const rect = imgWrap.getBoundingClientRect();
          const midX = mid.x - rect.left;
          const midY = mid.y - rect.top;

          const prevZoom = zoomLevel;
          zoomLevel = Math.min(
            MAX_ZOOM,
            Math.max(MIN_ZOOM, pinchStartZoom * (dist / pinchStartDist)),
          );

          const ratio = zoomLevel / prevZoom;
          const scrollX = (imgWrap.scrollLeft + midX) * ratio - midX;
          const scrollY = (imgWrap.scrollTop + midY) * ratio - midY;

          applyZoom();
          imgWrap.scrollLeft = scrollX;
          imgWrap.scrollTop = scrollY;
        } else if (isPanning && pinchPointers.size === 1) {
          imgWrap.scrollLeft = scrollStartX - (e.clientX - panStartX);
          imgWrap.scrollTop = scrollStartY - (e.clientY - panStartY);
        }
      });

      const endPointer = (e) => {
        pinchPointers.delete(e.pointerId);
        if (pinchPointers.size < 2) {
          if (pinchPointers.size === 1) {
            const remaining = [...pinchPointers.values()][0];
            isPanning = true;
            panStartX = remaining.x;
            panStartY = remaining.y;
            scrollStartX = imgWrap.scrollLeft;
            scrollStartY = imgWrap.scrollTop;
          } else {
            isPanning = false;
            imgWrap.style.cursor = "";
          }
        }
      };
      imgWrap.addEventListener("pointerup", endPointer);
      imgWrap.addEventListener("pointercancel", endPointer);
      imgWrap.addEventListener("touchstart", (e) => e.preventDefault(), {
        passive: false,
      });
    }

    function renderVideo(file) {
      mainEl.innerHTML = `
    <div class="player-stage player-stage-video">
      <div class="player-stage-meta">
        <div class="player-stage-filename">${esc(file.filename)}</div>
        <div class="player-stage-detail">
          <span class="player-stage-class">${esc(file.classification)}</span>
          <span class="player-stage-cycle">${esc(file.releaseCycle)}</span>
        </div>
        ${file.description ? `<div class="player-stage-desc">${esc(file.description)}</div>` : ""}
      </div>
      <div class="player-video-container">
        <video id="player-video-el" src="${esc(file.path)}"
               loop muted playsinline preload="metadata"
               style="image-rendering: pixelated; display: block; width: 100%; height: auto;">
        </video>
      </div>
      <div class="player-audio-btns">
        <button class="player-action-btn" id="player-pp">PLAY</button>
      </div>
    </div>`;

      const videoEl = mainEl.querySelector("#player-video-el");
      const ppBtn = mainEl.querySelector("#player-pp");
      const btnContainer = mainEl.querySelector(".player-audio-btns");

      const fullscreenBtn = document.createElement("button");
      fullscreenBtn.className = "player-action-btn";
      fullscreenBtn.id = "player-fullscreen";
      fullscreenBtn.textContent = "FULLSCREEN";
      btnContainer.appendChild(fullscreenBtn);

      const videoContainer = mainEl.querySelector(".player-video-container");

      ppBtn.addEventListener("click", () => {
        if (videoEl.paused) {
          videoEl.play();
          ppBtn.textContent = "PAUSE";
        } else {
          videoEl.pause();
          ppBtn.textContent = "PLAY";
        }
      });

      function toggleFullscreen() {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          videoContainer.requestFullscreen().catch((err) => {
            console.warn("Fullscreen request denied", err);
          });
        }
      }

      fullscreenBtn.addEventListener("click", toggleFullscreen);

      videoEl.addEventListener("dblclick", toggleFullscreen);

      document.addEventListener("fullscreenchange", () => {
        fullscreenBtn.textContent = document.fullscreenElement
          ? "EXIT FULLSCREEN"
          : "FULLSCREEN";
      });

      videoEl.addEventListener("canplay", () => {
        if (videoEl.paused) {
          videoEl
            .play()
            .then(() => {
              ppBtn.textContent = "PAUSE";
            })
            .catch(() => {});
        }
      });
    }

    body.querySelectorAll("[data-sort]").forEach((btn) => {
      btn.addEventListener("click", () => {
        sortMode = btn.dataset.sort;
        body
          .querySelectorAll("[data-sort]")
          .forEach((b) =>
            b.classList.toggle("active", b.dataset.sort === sortMode),
          );
        renderFileList();
      });
    });

    body.querySelectorAll("[data-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        filterMode = btn.dataset.filter;
        body
          .querySelectorAll("[data-filter]")
          .forEach((b) =>
            b.classList.toggle("active", b.dataset.filter === filterMode),
          );
        renderFileList();
      });
    });

    renderFileList();
    if (initialFileId) loadFile(initialFileId);
  }

  const ACTIONS = {
    openArchive() {
      WM.open({
        id: "archive",
        title: "ARCHIVE.pub",
        type: "default",
        width: 680,
        buildContent: buildArchive,
      });
    },
    openDepartments() {
      WM.open({
        id: "departments",
        title: "DEPT_NODES.sys",
        type: "default",
        width: 720,
        buildContent: buildDepartments,
      });
    },
    openTerminal() {
      WM.open({
        id: "terminal",
        title: "TERMINAL.exe",
        type: "terminal",
        width: 620,
        buildContent: buildTerminal,
      });
    },
    openPersonnel() {
      WM.open({
        id: "personnel",
        title: "PERSONNEL.sys",
        type: "default",
        width: 580,
        buildContent: buildPersonnel,
      });
    },
    openCorrupted() {
      WM.open({
        id: "corrupted",
        title: "[???]",
        type: "corrupted",
        width: 520,
        buildContent: buildCorrupted,
      });
    },
    openDevlogs() {
      WM.open({
        id: "devlogs",
        title: "DEVLOGS.pub",
        type: "default",
        width: 720,
        buildContent: buildDevlogs,
      });
    },

    openMediaPlayer(fileId) {
      if (WM.windows.has("player")) {
        const w = WM.windows.get("player");
        if (w.minimized) WM.restore("player");
        else WM.focus("player");
        if (fileId && playerLoad) playerLoad(fileId);
        return;
      }
      WM.open({
        id: "player",
        title: "SIA_PLAYER.sys",
        type: "player",
        width: 800,
        buildContent: (body) => buildMediaPlayer(body, fileId || null),
      });
    },
  };

  function buildDesktopIcons() {
    const grid = document.getElementById("desktop-icons");
    grid.innerHTML = "";
    DATA.DESKTOP_ICONS.forEach((icon) => {
      const el = document.createElement("div");
      el.className = "desktop-icon" + (icon.glitch ? " icon-glitch" : "");
      el.innerHTML = `<div class="icon-symbol">${esc(icon.symbol)}</div><div class="icon-label">${esc(icon.label)}</div>`;

      const activate = () => {
        if (ACTIONS[icon.action]) ACTIONS[icon.action]();
      };

      let lastClick = 0;
      el.addEventListener("click", () => {
        const now = Date.now();
        if (now - lastClick < 400) activate();
        lastClick = now;
      });

      el.addEventListener("touchend", (e) => {
        e.preventDefault();
        activate();
      });

      grid.appendChild(el);
    });
  }

  function startCycleCounter() {
    const cycleEl = document.getElementById("tb-cycle");
    let cycle = DATA.SYSTEM.cycleBase;
    let tick = 0;

    setInterval(() => {
      tick++;
      if (tick >= DATA.SYSTEM.ticksPerCycle) {
        tick = 0;
        cycle++;
      }
      const tickStr = String(tick).padStart(5, "0");
      cycleEl.textContent = `CYC-${cycle} // T-${tickStr}`;
    }, DATA.SYSTEM.tickRate);
  }

  async function runBoot() {
    const bootScreen = document.getElementById("boot-screen");
    const bootLog = document.getElementById("boot-log");
    const skipBtn = document.getElementById("boot-skip");
    let skipped = false;

    const skip = () => {
      skipped = true;
    };
    skipBtn.addEventListener("click", skip);
    document.addEventListener("keydown", skip, { once: true });

    for (const line of DATA.BOOT_SEQUENCE) {
      if (skipped) break;
      await sleep(line.delay || 0);
      if (skipped) break;

      if (line.text === "") {
        const blank = document.createElement("div");
        blank.className = "boot-blank";
        blank.innerHTML = "&nbsp;";
        bootLog.appendChild(blank);
        bootLog.scrollTop = bootLog.scrollHeight;
        continue;
      }

      const lineEl = document.createElement("div");
      lineEl.className = "boot-line";
      bootLog.appendChild(lineEl);
      bootLog.scrollTop = bootLog.scrollHeight;

      for (const char of line.text) {
        if (skipped) {
          lineEl.textContent = line.text;
          break;
        }
        lineEl.textContent += char;
        await sleep(DATA.BOOT_CHAR_DELAY);
      }

      await sleep(DATA.BOOT_LINE_DELAY);
    }

    await sleep(skipped ? 0 : 400);
    bootScreen.classList.add("boot-out");
    await sleep(500);
    bootScreen.style.display = "none";
    document.getElementById("desktop").classList.remove("hidden");
    resizeCanvas();
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildDesktopIcons();
    startCycleCounter();
    runBoot();
  });

  document
    .getElementById("tb-logo")
    .addEventListener("click", () => ACTIONS.openArchive());
})();
