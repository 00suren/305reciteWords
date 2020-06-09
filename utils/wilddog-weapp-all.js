! function (t, e) {
  "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.eio = e() : t.eio = e()
}(global, function () {
  return function (t) {
    function e(n) {
      if (r[n]) return r[n].exports;
      var o = r[n] = {
        exports: {},
        id: n,
        loaded: !1
      };
      return t[n].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
    }
    var r = {};
    return e.m = t, e.c = r, e.p = "", e(0)
  }([function (t, e, r) {
    "use strict";
    t.exports = r(1), global.eio = t.exports
  }, function (t, e, r) {
    "use strict";
    t.exports = r(2), t.exports.parser = r(6)
  }, function (t, e, r) {
    "use strict";

    function n(t, e) {
      if (!(this instanceof n)) return new n(t, e);
      e = e || {}, t && "object" === ("undefined" == typeof t ? "undefined" : s(t)) && (e = t, t = null), t ? (t = p(t), e.hostname = t.host, e.secure = "https" === t.protocol || "wss" === t.protocol, e.port = t.port, t.query && (e.query = t.query)) : e.host && (e.hostname = p(e.host).host), this.secure = null != e.secure ? e.secure : global.location && "https:" === location.protocol, e.hostname && !e.port && (e.port = this.secure ? "443" : "80"), this.agent = e.agent || !1, this.hostname = e.hostname || (global.location ? location.hostname : "localhost"), this.port = e.port || (global.location && location.port ? location.port : this.secure ? 443 : 80), this.query = e.query || {}, "string" == typeof this.query && (this.query = l.decode(this.query)), this.upgrade = !1 !== e.upgrade, this.path = (e.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!e.forceJSONP, this.jsonp = !1 !== e.jsonp, this.forceBase64 = !!e.forceBase64, this.enablesXDR = !!e.enablesXDR, this.timestampParam = e.timestampParam || "t", this.timestampRequests = e.timestampRequests, this.transports = e.transports || ["websocket"], this.readyState = "", this.writeBuffer = [], this.policyPort = e.policyPort || 843, this.rememberUpgrade = e.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = e.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== e.perMessageDeflate && (e.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = e.pfx || null, this.key = e.key || null, this.passphrase = e.passphrase || null, this.cert = e.cert || null, this.ca = e.ca || null, this.ciphers = e.ciphers || null, this.rejectUnauthorized = void 0 === e.rejectUnauthorized || e.rejectUnauthorized;
      var r = "object" === ("undefined" == typeof global ? "undefined" : s(global)) && global;
      r.global === r && e.extraHeaders && Object.keys(e.extraHeaders).length > 0 && (this.extraHeaders = e.extraHeaders), this.open()
    }

    function o(t) {
      var e = {};
      for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
      return e
    }
    var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      },
      i = r(3),
      a = r(17),
      c = r(21)("engine.io-client:socket"),
      u = r(32),
      h = r(6),
      p = r(33),
      l = r(18);
    t.exports = n, n.priorWebsocketSuccess = !1, a(n.prototype), n.protocol = h.protocol, n.Socket = n, n.Transport = r(5), n.transports = r(3), n.parser = r(6), n.prototype.createTransport = function (t) {
      c('creating transport "%s"', t);
      var e = o(this.query);
      e.EIO = h.protocol, e.transport = t, this.id && (e.sid = this.id);
      var r = new i[t]({
        agent: this.agent,
        hostname: this.hostname,
        port: this.port,
        secure: this.secure,
        path: this.path,
        query: e,
        forceJSONP: this.forceJSONP,
        jsonp: this.jsonp,
        forceBase64: this.forceBase64,
        enablesXDR: this.enablesXDR,
        timestampRequests: this.timestampRequests,
        timestampParam: this.timestampParam,
        policyPort: this.policyPort,
        socket: this,
        pfx: this.pfx,
        key: this.key,
        passphrase: this.passphrase,
        cert: this.cert,
        ca: this.ca,
        ciphers: this.ciphers,
        rejectUnauthorized: this.rejectUnauthorized,
        perMessageDeflate: this.perMessageDeflate,
        extraHeaders: this.extraHeaders
      });
      return r
    }, n.prototype.open = function () {
      var t;
      if (this.rememberUpgrade && n.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) t = "websocket";
      else {
        if (0 === this.transports.length) {
          var e = this;
          return void setTimeout(function () {
            e.emit("error", "No transports available")
          }, 0)
        }
        t = this.transports[0]
      }
      this.readyState = "opening";
      try {
        t = this.createTransport(t)
      } catch (r) {
        return this.transports.shift(), void this.open()
      }
      t.open(), this.setTransport(t)
    }, n.prototype.setTransport = function (t) {
      c("setting transport %s", t.name);
      var e = this;
      this.transport && (c("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = t, t.on("drain", function () {
        e.onDrain()
      }).on("packet", function (t) {
        e.onPacket(t)
      }).on("error", function (t) {
        e.onError(t)
      }).on("close", function () {
        e.onClose("transport close")
      })
    }, n.prototype.probe = function (t) {
      function e() {
        if (l.onlyBinaryUpgrades) {
          var e = !this.supportsBinary && l.transport.supportsBinary;
          p = p || e
        }
        p || (c('probe transport "%s" opened', t), h.send([{
          type: "ping",
          data: "probe"
        }]), h.once("packet", function (e) {
          if (!p)
            if ("pong" === e.type && "probe" === e.data) {
              if (c('probe transport "%s" pong', t), l.upgrading = !0, l.emit("upgrading", h), !h) return;
              n.priorWebsocketSuccess = "websocket" === h.name, c('pausing current transport "%s"', l.transport.name), l.transport.pause(function () {
                p || "closed" !== l.readyState && (c("changing transport and sending upgrade packet"), u(), l.setTransport(h), h.send([{
                  type: "upgrade"
                }]), l.emit("upgrade", h), h = null, l.upgrading = !1, l.flush())
              })
            } else {
              c('probe transport "%s" failed', t);
              var r = new Error("probe error");
              r.transport = h.name, l.emit("upgradeError", r)
            }
        }))
      }

      function r() {
        p || (p = !0, u(), h.close(), h = null)
      }

      function o(e) {
        var n = new Error("probe error: " + e);
        n.transport = h.name, r(), c('probe transport "%s" failed because of error: %s', t, e), l.emit("upgradeError", n)
      }

      function s() {
        o("transport closed")
      }

      function i() {
        o("socket closed")
      }

      function a(t) {
        h && t.name !== h.name && (c('"%s" works - aborting "%s"', t.name, h.name), r())
      }

      function u() {
        h.removeListener("open", e), h.removeListener("error", o), h.removeListener("close", s), l.removeListener("close", i), l.removeListener("upgrading", a)
      }
      c('probing transport "%s"', t);
      var h = this.createTransport(t, {
          probe: 1
        }),
        p = !1,
        l = this;
      n.priorWebsocketSuccess = !1, h.once("open", e), h.once("error", o), h.once("close", s), this.once("close", i), this.once("upgrading", a), h.open()
    }, n.prototype.onOpen = function () {
      if (c("socket open"), this.readyState = "open", n.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {
        c("starting upgrade probes");
        for (var t = 0, e = this.upgrades.length; t < e; t++) this.probe(this.upgrades[t])
      }
    }, n.prototype.onPacket = function (t) {
      if ("opening" === this.readyState || "open" === this.readyState) switch (c('socket receive: type "%s", data "%s"', t.type, t.data), this.emit("packet", t), this.emit("heartbeat"), t.type) {
        case "open":
          this.onHandshake(JSON.parse(t.data));
          break;
        case "pong":
          this.setPing(), this.emit("pong");
          break;
        case "error":
          var e = new Error("server error");
          e.code = t.data, this.onError(e);
          break;
        case "message":
          this.emit("data", t.data), this.emit("message", t.data)
      } else c('packet received with socket readyState "%s"', this.readyState)
    }, n.prototype.onHandshake = function (t) {
      this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
    }, n.prototype.onHeartbeat = function (t) {
      clearTimeout(this.pingTimeoutTimer);
      var e = this;
      e.pingTimeoutTimer = setTimeout(function () {
        "closed" !== e.readyState && e.onClose("ping timeout")
      }, t || e.pingInterval + e.pingTimeout)
    }, n.prototype.setPing = function () {
      var t = this;
      clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(function () {
        c("writing ping packet - expecting pong within %sms", t.pingTimeout), t.ping(), t.onHeartbeat(t.pingTimeout)
      }, t.pingInterval)
    }, n.prototype.ping = function () {
      var t = this;
      this.sendPacket("ping", function () {
        t.emit("ping")
      })
    }, n.prototype.onDrain = function () {
      this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
    }, n.prototype.flush = function () {
      "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (c("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
    }, n.prototype.write = n.prototype.send = function (t, e, r) {
      return this.sendPacket("message", t, e, r), this
    }, n.prototype.sendPacket = function (t, e, r, n) {
      if ("function" == typeof e && (n = e, e = void 0), "function" == typeof r && (n = r, r = null), "closing" !== this.readyState && "closed" !== this.readyState) {
        r = r || {}, r.compress = !1 !== r.compress;
        var o = {
          type: t,
          data: e,
          options: r
        };
        this.emit("packetCreate", o), this.writeBuffer.push(o), n && this.once("flush", n), this.flush()
      }
    }, n.prototype.close = function () {
      function t() {
        n.onClose("forced close"), c("socket closing - telling transport to close"), n.transport.close()
      }

      function e() {
        n.removeListener("upgrade", e), n.removeListener("upgradeError", e), t()
      }

      function r() {
        n.once("upgrade", e), n.once("upgradeError", e)
      }
      if ("opening" === this.readyState || "open" === this.readyState) {
        this.readyState = "closing";
        var n = this;
        this.writeBuffer.length ? this.once("drain", function () {
          this.upgrading ? r() : t()
        }) : this.upgrading ? r() : t()
      }
      return this
    }, n.prototype.onError = function (t) {
      c("socket error %j", t), n.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error", t)
    }, n.prototype.onClose = function (t, e) {
      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
        c('socket close with reason: "%s"', t);
        var r = this;
        clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", t, e), r.writeBuffer = [], r.prevBufferLen = 0
      }
    }, n.prototype.filterUpgrades = function (t) {
      for (var e = [], r = 0, n = t.length; r < n; r++) ~u(this.transports, t[r]) && e.push(t[r]);
      return e
    }
  }, function (t, e, r) {
    "use strict";

    function n(t) {
      var e, r = !1,
        n = !1,
        o = !1 !== t.jsonp;
      if (global.location) {
        var s = "https:" === location.protocol,
          i = location.port;
        i || (i = s ? 443 : 80), r = t.hostname !== location.hostname || i !== t.port, n = t.secure !== s
      }
      if (t.xdomain = r, t.xscheme = n, e = new XMLHttpRequest(t), "open" in e && !t.forceJSONP) return new XHR(t);
      if (!o) throw new Error("JSONP disabled");
      return new JSONP(t)
    }
    var o = r(4);
    e.polling = n, e.websocket = o
  }, function (t, e, r) {
    "use strict";

    function n(t) {
      var e = t && t.forceBase64;
      e && (this.supportsBinary = !1), this.perMessageDeflate = t.perMessageDeflate, o.call(this, t)
    }
    var o = r(5),
      s = r(6),
      i = r(18),
      a = r(19),
      c = r(20),
      u = r(21)("engine.io-client:websocket"),
      h = r(24).WebSocket;
    t.exports = n, a(n, o), n.prototype.name = "websocket", n.prototype.supportsBinary = !0, n.prototype.doOpen = function () {
      if (this.check()) {
        var t = this.uri(),
          e = {
            agent: this.agent,
            perMessageDeflate: this.perMessageDeflate
          };
        e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (e.headers = this.extraHeaders), this.ws = new h(t), void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners()
      }
    }, n.prototype.addEventListeners = function () {
      var t = this;
      this.ws.onopen = function () {
        t.onOpen()
      }, this.ws.onclose = function () {
        t.onClose()
      }, this.ws.onmessage = function (e) {
        t.onData(e.data)
      }, this.ws.onerror = function (e) {
        t.onError("websocket error", e)
      }
    }, "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (n.prototype.onData = function (t) {
      var e = this;
      setTimeout(function () {
        o.prototype.onData.call(e, t)
      }, 0)
    }), n.prototype.write = function (t) {
      function e() {
        r.emit("flush"), setTimeout(function () {
          r.writable = !0, r.emit("drain")
        }, 0)
      }
      var r = this;
      this.writable = !1;
      for (var n = t.length, o = 0, i = n; o < i; o++) ! function (t) {
        s.encodePacket(t, r.supportsBinary, function (t) {
          try {
            r.ws.send(t)
          } catch (o) {
            u("websocket closed before onclose event")
          }--n || e()
        })
      }(t[o])
    }, n.prototype.onClose = function () {
      o.prototype.onClose.call(this)
    }, n.prototype.doClose = function () {
      "undefined" != typeof this.ws && this.ws.close()
    }, n.prototype.uri = function () {
      var t = this.query || {},
        e = this.secure ? "wss" : "ws",
        r = "";
      this.timestampRequests && (t[this.timestampParam] = c()), this.supportsBinary || (t.b64 = 1), t = i.encode(t), t.length && (t = "?" + t);
      var n = this.hostname.indexOf(":") !== -1;
      return e + "://" + (n ? "[" + this.hostname + "]" : this.hostname) + r + this.path + t
    }, n.prototype.check = function () {
      return !(!h || "__initialize" in h && this.name === n.prototype.name)
    }
  }, function (t, e, r) {
    "use strict";

    function n(t) {
      this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, this.query = t.query, this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, this.readyState = "", this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.extraHeaders = t.extraHeaders
    }
    var o = r(6),
      s = r(17);
    t.exports = n, s(n.prototype), n.prototype.onError = function (t, e) {
      var r = new Error(t);
      return r.type = "TransportError", r.description = e, this.emit("error", r), this
    }, n.prototype.open = function () {
      return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this
    }, n.prototype.close = function () {
      return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this
    }, n.prototype.send = function (t) {
      if ("open" !== this.readyState) throw new Error("Transport not open");
      this.write(t)
    }, n.prototype.onOpen = function () {
      this.readyState = "open", this.writable = !0, this.emit("open")
    }, n.prototype.onData = function (t) {
      var e = o.decodePacket(t, this.socket.binaryType);
      this.onPacket(e)
    }, n.prototype.onPacket = function (t) {
      this.emit("packet", t)
    }, n.prototype.onClose = function () {
      this.readyState = "closed", this.emit("close")
    }
  }, function (t, e, r) {
    "use strict";

    function n(t, r) {
      var n = "b" + e.packets[t.type] + t.data.data;
      return r(n)
    }

    function o(t, r, n) {
      if (!r) return e.encodeBase64Packet(t, n);
      var o = t.data,
        s = new Uint8Array(o),
        i = new Uint8Array(1 + o.byteLength);
      i[0] = v[t.type];
      for (var a = 0; a < s.length; a++) i[a + 1] = s[a];
      return n(i.buffer)
    }

    function s(t, r, n) {
      if (!r) return e.encodeBase64Packet(t, n);
      var o = new FileReader;
      return o.onload = function () {
        t.data = o.result, e.encodePacket(t, r, !0, n)
      }, o.readAsArrayBuffer(t.data)
    }

    function i(t, r, n) {
      if (!r) return e.encodeBase64Packet(t, n);
      if (m) return s(t, r, n);
      var o = new Uint8Array(1);
      o[0] = v[t.type];
      var i = new k([o.buffer, t.data]);
      return n(i)
    }

    function a(t) {
      try {
        t = d.decode(t)
      } catch (e) {
        return !1
      }
      return t
    }

    function c(t, e, r) {
      for (var n = new Array(t.length), o = f(t.length, r), s = function (t, r, o) {
          e(r, function (e, r) {
            n[t] = r, o(e, n)
          })
        }, i = 0; i < t.length; i++) s(i, t[i], o)
    }
    var u, h = r(7),
      p = r(8),
      l = r(10),
      f = r(11),
      d = r(12);
    global && global.ArrayBuffer && (u = r(15));
    var y = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent),
      g = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
      m = y || g;
    e.protocol = 3;
    var v = e.packets = {
        open: 0,
        close: 1,
        ping: 2,
        pong: 3,
        message: 4,
        upgrade: 5,
        noop: 6
      },
      b = h(v),
      w = {
        type: "error",
        data: "parser error"
      },
      k = r(16);
    e.encodePacket = function (t, e, r, s) {
      "function" == typeof e && (s = e, e = !1), "function" == typeof r && (s = r, r = null);
      var a = void 0 === t.data ? void 0 : t.data.buffer || t.data;
      if (global.ArrayBuffer && a instanceof ArrayBuffer) return o(t, e, s);
      if (k && a instanceof global.Blob) return i(t, e, s);
      if (a && a.base64) return n(t, s);
      var c = v[t.type];
      return void 0 !== t.data && (c += r ? d.encode(String(t.data)) : String(t.data)), s("" + c)
    }, e.encodeBase64Packet = function (t, r) {
      var n = "b" + e.packets[t.type];
      if (k && t.data instanceof global.Blob) {
        var o = new FileReader;
        return o.onload = function () {
          var t = o.result.split(",")[1];
          r(n + t)
        }, o.readAsDataURL(t.data)
      }
      var s;
      try {
        s = String.fromCharCode.apply(null, new Uint8Array(t.data))
      } catch (i) {
        for (var a = new Uint8Array(t.data), c = new Array(a.length), u = 0; u < a.length; u++) c[u] = a[u];
        s = String.fromCharCode.apply(null, c)
      }
      return n += global.btoa(s), r(n)
    }, e.decodePacket = function (t, r, n) {
      if ("string" == typeof t || void 0 === t) {
        if ("b" == t.charAt(0)) return e.decodeBase64Packet(t.substr(1), r);
        if (n && (t = a(t), t === !1)) return w;
        var o = t.charAt(0);
        return Number(o) == o && b[o] ? t.length > 1 ? {
          type: b[o],
          data: t.substring(1)
        } : {
          type: b[o]
        } : w
      }
      var s = new Uint8Array(t),
        o = s[0],
        i = l(t, 1);
      return k && "blob" === r && (i = new k([i])), {
        type: b[o],
        data: i
      }
    }, e.decodeBase64Packet = function (t, e) {
      var r = b[t.charAt(0)];
      if (!u) return {
        type: r,
        data: {
          base64: !0,
          data: t.substr(1)
        }
      };
      var n = u.decode(t.substr(1));
      return "blob" === e && k && (n = new k([n])), {
        type: r,
        data: n
      }
    }, e.encodePayload = function (t, r, n) {
      function o(t) {
        return t.length + ":" + t
      }

      function s(t, n) {
        e.encodePacket(t, !!i && r, !0, function (t) {
          n(null, o(t))
        })
      }
      "function" == typeof r && (n = r, r = null);
      var i = p(t);
      return r && i ? k && !m ? e.encodePayloadAsBlob(t, n) : e.encodePayloadAsArrayBuffer(t, n) : t.length ? void c(t, s, function (t, e) {
        return n(e.join(""))
      }) : n("0:")
    }, e.decodePayload = function (t, r, n) {
      if ("string" != typeof t) return e.decodePayloadAsBinary(t, r, n);
      "function" == typeof r && (n = r, r = null);
      var o;
      if ("" == t) return n(w, 0, 1);
      for (var s, i, a = "", c = 0, u = t.length; c < u; c++) {
        var h = t.charAt(c);
        if (":" != h) a += h;
        else {
          if ("" == a || a != (s = Number(a))) return n(w, 0, 1);
          if (i = t.substr(c + 1, s), a != i.length) return n(w, 0, 1);
          if (i.length) {
            if (o = e.decodePacket(i, r, !0), w.type == o.type && w.data == o.data) return n(w, 0, 1);
            var p = n(o, c + s, u);
            if (!1 === p) return
          }
          c += s, a = ""
        }
      }
      return "" != a ? n(w, 0, 1) : void 0
    }, e.encodePayloadAsArrayBuffer = function (t, r) {
      function n(t, r) {
        e.encodePacket(t, !0, !0, function (t) {
          return r(null, t)
        })
      }
      return t.length ? void c(t, n, function (t, e) {
        var n = e.reduce(function (t, e) {
            var r;
            return r = "string" == typeof e ? e.length : e.byteLength, t + r.toString().length + r + 2
          }, 0),
          o = new Uint8Array(n),
          s = 0;
        return e.forEach(function (t) {
          var e = "string" == typeof t,
            r = t;
          if (e) {
            for (var n = new Uint8Array(t.length), i = 0; i < t.length; i++) n[i] = t.charCodeAt(i);
            r = n.buffer
          }
          e ? o[s++] = 0 : o[s++] = 1;
          for (var a = r.byteLength.toString(), i = 0; i < a.length; i++) o[s++] = parseInt(a[i]);
          o[s++] = 255;
          for (var n = new Uint8Array(r), i = 0; i < n.length; i++) o[s++] = n[i]
        }), r(o.buffer)
      }) : r(new ArrayBuffer(0))
    }, e.encodePayloadAsBlob = function (t, r) {
      function n(t, r) {
        e.encodePacket(t, !0, !0, function (t) {
          var e = new Uint8Array(1);
          if (e[0] = 1, "string" == typeof t) {
            for (var n = new Uint8Array(t.length), o = 0; o < t.length; o++) n[o] = t.charCodeAt(o);
            t = n.buffer, e[0] = 0
          }
          for (var s = t instanceof ArrayBuffer ? t.byteLength : t.size, i = s.toString(), a = new Uint8Array(i.length + 1), o = 0; o < i.length; o++) a[o] = parseInt(i[o]);
          if (a[i.length] = 255, k) {
            var c = new k([e.buffer, a.buffer, t]);
            r(null, c)
          }
        })
      }
      c(t, n, function (t, e) {
        return r(new k(e))
      })
    }, e.decodePayloadAsBinary = function (t, r, n) {
      "function" == typeof r && (n = r, r = null);
      for (var o = t, s = [], i = !1; o.byteLength > 0;) {
        for (var a = new Uint8Array(o), c = 0 === a[0], u = "", h = 1; 255 != a[h]; h++) {
          if (u.length > 310) {
            i = !0;
            break
          }
          u += a[h]
        }
        if (i) return n(w, 0, 1);
        o = l(o, 2 + u.length), u = parseInt(u);
        var p = l(o, 0, u);
        if (c) try {
          p = String.fromCharCode.apply(null, new Uint8Array(p))
        } catch (f) {
          var d = new Uint8Array(p);
          p = "";
          for (var h = 0; h < d.length; h++) p += String.fromCharCode(d[h])
        }
        s.push(p), o = l(o, u)
      }
      var y = s.length;
      s.forEach(function (t, o) {
        n(e.decodePacket(t, r, !0), o, y)
      })
    }
  }, function (t, e) {
    "use strict";
    t.exports = Object.keys || function (t) {
      var e = [],
        r = Object.prototype.hasOwnProperty;
      for (var n in t) r.call(t, n) && e.push(n);
      return e
    }
  }, function (t, e, r) {
    "use strict";

    function n(t) {
      function e(t) {
        if (!t) return !1;
        if (global.Buffer && global.Buffer.isBuffer(t) || global.ArrayBuffer && t instanceof ArrayBuffer || global.Blob && t instanceof Blob || global.File && t instanceof File) return !0;
        if (s(t)) {
          for (var r = 0; r < t.length; r++)
            if (e(t[r])) return !0
        } else if (t && "object" == ("undefined" == typeof t ? "undefined" : o(t))) {
          t.toJSON && (t = t.toJSON());
          for (var n in t)
            if (Object.prototype.hasOwnProperty.call(t, n) && e(t[n])) return !0
        }
        return !1
      }
      return e(t)
    }
    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      },
      s = r(9);
    t.exports = n
  }, function (t, e) {
    "use strict";
    t.exports = Array.isArray || function (t) {
      return "[object Array]" == Object.prototype.toString.call(t)
    }
  }, function (t, e) {
    "use strict";
    t.exports = function (t, e, r) {
      var n = t.byteLength;
      if (e = e || 0, r = r || n, t.slice) return t.slice(e, r);
      if (e < 0 && (e += n), r < 0 && (r += n), r > n && (r = n), e >= n || e >= r || 0 === n) return new ArrayBuffer(0);
      for (var o = new Uint8Array(t), s = new Uint8Array(r - e), i = e, a = 0; i < r; i++, a++) s[a] = o[i];
      return s.buffer
    }
  }, function (t, e) {
    "use strict";

    function r(t, e, r) {
      function o(t, n) {
        if (o.count <= 0) throw new Error("after called too many times");
        --o.count, t ? (s = !0, e(t), e = r) : 0 !== o.count || s || e(null, n)
      }
      var s = !1;
      return r = r || n, o.count = t, 0 === t ? e() : o
    }

    function n() {}
    t.exports = r
  }, function (t, e, r) {
    var n;
    (function (t) {
      "use strict";
      var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      };
      ! function (s) {
        function i(t) {
          for (var e, r, n = [], o = 0, s = t.length; o < s;) e = t.charCodeAt(o++), e >= 55296 && e <= 56319 && o < s ? (r = t.charCodeAt(o++), 56320 == (64512 & r) ? n.push(((1023 & e) << 10) + (1023 & r) + 65536) : (n.push(e), o--)) : n.push(e);
          return n
        }

        function a(t) {
          for (var e, r = t.length, n = -1, o = ""; ++n < r;) e = t[n], e > 65535 && (e -= 65536, o += w(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), o += w(e);
          return o
        }

        function c(t, e) {
          return w(t >> e & 63 | 128)
        }

        function u(t) {
          if (0 == (4294967168 & t)) return w(t);
          var e = "";
          return 0 == (4294965248 & t) ? e = w(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (e = w(t >> 12 & 15 | 224), e += c(t, 6)) : 0 == (4292870144 & t) && (e = w(t >> 18 & 7 | 240), e += c(t, 12), e += c(t, 6)), e += w(63 & t | 128)
        }

        function h(t) {
          for (var e, r = i(t), n = r.length, o = -1, s = ""; ++o < n;) e = r[o], s += u(e);
          return s
        }

        function p() {
          if (b >= v) throw Error("Invalid byte index");
          var t = 255 & m[b];
          if (b++, 128 == (192 & t)) return 63 & t;
          throw Error("Invalid continuation byte")
        }

        function l() {
          var t, e, r, n, o;
          if (b > v) throw Error("Invalid byte index");
          if (b == v) return !1;
          if (t = 255 & m[b], b++, 0 == (128 & t)) return t;
          if (192 == (224 & t)) {
            var e = p();
            if (o = (31 & t) << 6 | e, o >= 128) return o;
            throw Error("Invalid continuation byte")
          }
          if (224 == (240 & t)) {
            if (e = p(), r = p(), o = (15 & t) << 12 | e << 6 | r, o >= 2048) return o;
            throw Error("Invalid continuation byte")
          }
          if (240 == (248 & t) && (e = p(), r = p(), n = p(), o = (15 & t) << 18 | e << 12 | r << 6 | n, o >= 65536 && o <= 1114111)) return o;
          throw Error("Invalid WTF-8 detected")
        }

        function f(t) {
          m = i(t), v = m.length, b = 0;
          for (var e, r = [];
            (e = l()) !== !1;) r.push(e);
          return a(r)
        }
        var d = "object" == o(e) && e,
          y = "object" == o(t) && t && t.exports == d && t,
          g = "object" == ("undefined" == typeof global ? "undefined" : o(global)) && global;
        g.global !== g && g.window !== g || (s = g);
        var m, v, b, w = String.fromCharCode,
          k = {
            version: "1.0.0",
            encode: h,
            decode: f
          };
        if ("object" == o(r(14)) && r(14)) n = function () {
          return k
        }.call(e, r, e, t), !(void 0 !== n && (t.exports = n));
        else if (d && !d.nodeType)
          if (y) y.exports = k;
          else {
            var S = {},
              x = S.hasOwnProperty;
            for (var A in k) x.call(k, A) && (d[A] = k[A])
          }
        else s.wtf8 = k
      }(void 0)
    }).call(e, r(13)(t))
  }, function (t, e) {
    "use strict";
    t.exports = function (t) {
      return t.webpackPolyfill || (t.deprecate = function () {}, t.paths = [], t.children = [], t.webpackPolyfill = 1), t
    }
  }, function (t, e) {
    (function (e) {
      t.exports = e
    }).call(e, {})
  }, function (t, e) {
    "use strict";
    ! function () {
      for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = new Uint8Array(256), n = 0; n < t.length; n++) r[t.charCodeAt(n)] = n;
      e.encode = function (e) {
        var r, n = new Uint8Array(e),
          o = n.length,
          s = "";
        for (r = 0; r < o; r += 3) s += t[n[r] >> 2], s += t[(3 & n[r]) << 4 | n[r + 1] >> 4], s += t[(15 & n[r + 1]) << 2 | n[r + 2] >> 6], s += t[63 & n[r + 2]];
        return o % 3 === 2 ? s = s.substring(0, s.length - 1) + "=" : o % 3 === 1 && (s = s.substring(0, s.length - 2) + "=="), s
      }, e.decode = function (t) {
        var e, n, o, s, i, a = .75 * t.length,
          c = t.length,
          u = 0;
        "=" === t[t.length - 1] && (a--, "=" === t[t.length - 2] && a--);
        var h = new ArrayBuffer(a),
          p = new Uint8Array(h);
        for (e = 0; e < c; e += 4) n = r[t.charCodeAt(e)], o = r[t.charCodeAt(e + 1)], s = r[t.charCodeAt(e + 2)], i = r[t.charCodeAt(e + 3)], p[u++] = n << 2 | o >> 4, p[u++] = (15 & o) << 4 | s >> 2, p[u++] = (3 & s) << 6 | 63 & i;
        return h
      }
    }()
  }, function (t, e) {
    "use strict";

    function r(t) {
      for (var e = 0; e < t.length; e++) {
        var r = t[e];
        if (r.buffer instanceof ArrayBuffer) {
          var n = r.buffer;
          if (r.byteLength !== n.byteLength) {
            var o = new Uint8Array(r.byteLength);
            o.set(new Uint8Array(n, r.byteOffset, r.byteLength)), n = o.buffer
          }
          t[e] = n
        }
      }
    }

    function n(t, e) {
      e = e || {};
      var n = new s;
      r(t);
      for (var o = 0; o < t.length; o++) n.append(t[o]);
      return e.type ? n.getBlob(e.type) : n.getBlob()
    }

    function o(t, e) {
      return r(t), new Blob(t, e || {})
    }
    var s = global.BlobBuilder || global.WebKitBlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder,
      i = function () {
        try {
          var t = new Blob(["hi"]);
          return 2 === t.size
        } catch (e) {
          return !1
        }
      }(),
      a = i && function () {
        try {
          var t = new Blob([new Uint8Array([1, 2])]);
          return 2 === t.size
        } catch (e) {
          return !1
        }
      }(),
      c = s && s.prototype.append && s.prototype.getBlob;
    t.exports = function () {
      return i ? a ? global.Blob : o : c ? n : void 0
    }()
  }, function (t, e) {
    "use strict";

    function r(t) {
      if (t) return n(t)
    }

    function n(t) {
      for (var e in r.prototype) t[e] = r.prototype[e];
      return t
    }
    t.exports = r, r.prototype.on = r.prototype.addEventListener = function (t, e) {
      return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t] || []).push(e), this
    }, r.prototype.once = function (t, e) {
      function r() {
        n.off(t, r), e.apply(this, arguments)
      }
      var n = this;
      return this._callbacks = this._callbacks || {}, r.fn = e, this.on(t, r), this
    }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function (t, e) {
      if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
      var r = this._callbacks[t];
      if (!r) return this;
      if (1 == arguments.length) return delete this._callbacks[t], this;
      for (var n, o = 0; o < r.length; o++)
        if (n = r[o], n === e || n.fn === e) {
          r.splice(o, 1);
          break
        } return this
    }, r.prototype.emit = function (t) {
      this._callbacks = this._callbacks || {};
      var e = [].slice.call(arguments, 1),
        r = this._callbacks[t];
      if (r) {
        r = r.slice(0);
        for (var n = 0, o = r.length; n < o; ++n) r[n].apply(this, e)
      }
      return this
    }, r.prototype.listeners = function (t) {
      return this._callbacks = this._callbacks || {}, this._callbacks[t] || []
    }, r.prototype.hasListeners = function (t) {
      return !!this.listeners(t).length
    }
  }, function (t, e) {
    "use strict";
    e.encode = function (t) {
      var e = "";
      for (var r in t) t.hasOwnProperty(r) && (e.length && (e += "&"), e += encodeURIComponent(r) + "=" + encodeURIComponent(t[r]));
      return e
    }, e.decode = function (t) {
      for (var e = {}, r = t.split("&"), n = 0, o = r.length; n < o; n++) {
        var s = r[n].split("=");
        e[decodeURIComponent(s[0])] = decodeURIComponent(s[1])
      }
      return e
    }
  }, function (t, e) {
    "use strict";
    t.exports = function (t, e) {
      var r = function () {};
      r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
    }
  }, function (t, e) {
    "use strict";

    function r(t) {
      var e = "";
      do e = i[t % a] + e, t = Math.floor(t / a); while (t > 0);
      return e
    }

    function n(t) {
      var e = 0;
      for (h = 0; h < t.length; h++) e = e * a + c[t.charAt(h)];
      return e
    }

    function o() {
      var t = r(+new Date);
      return t !== s ? (u = 0, s = t) : t + "." + r(u++)
    }
    for (var s, i = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), a = 64, c = {}, u = 0, h = 0; h < a; h++) c[i[h]] = h;
    o.encode = r, o.decode = n, t.exports = o
  }, function (t, e, r) {
    "use strict";

    function n() {
      return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
    }

    function o() {
      var t = arguments,
        r = this.useColors;
      if (t[0] = (r ? "%c" : "") + this.namespace + (r ? " %c" : " ") + t[0] + (r ? "%c " : " ") + "+" + e.humanize(this.diff), !r) return t;
      var n = "color: " + this.color;
      t = [t[0], n, "color: inherit"].concat(Array.prototype.slice.call(t, 1));
      var o = 0,
        s = 0;
      return t[0].replace(/%[a-z%]/g, function (t) {
        "%%" !== t && (o++, "%c" === t && (s = o))
      }), t.splice(s, 0, n), t
    }

    function s() {
      return "object" === ("undefined" == typeof console ? "undefined" : u(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments)
    }

    function i(t) {
      try {
        null == t ? e.storage.removeItem("debug") : e.storage.debug = t
      } catch (r) {}
    }

    function a() {
      var t;
      try {
        t = e.storage.debug
      } catch (r) {}
      return t
    }

    function c() {
      try {
        return window.localStorage
      } catch (t) {}
    }
    var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    e = t.exports = r(22), e.log = s, e.formatArgs = o, e.save = i, e.load = a, e.useColors = n, e.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : c(), e.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], e.formatters.j = function (t) {
      return JSON.stringify(t)
    }, e.enable(a())
  }, function (t, e, r) {
    "use strict";

    function n() {
      return e.colors[h++ % e.colors.length]
    }

    function o(t) {
      function r() {}

      function o() {
        var t = o,
          r = +new Date,
          s = r - (u || r);
        t.diff = s, t.prev = u, t.curr = r, u = r, null == t.useColors && (t.useColors = e.useColors()), null == t.color && t.useColors && (t.color = n());
        var i = Array.prototype.slice.call(arguments);
        i[0] = e.coerce(i[0]), "string" != typeof i[0] && (i = ["%o"].concat(i));
        var a = 0;
        i[0] = i[0].replace(/%([a-z%])/g, function (r, n) {
          if ("%%" === r) return r;
          a++;
          var o = e.formatters[n];
          if ("function" == typeof o) {
            var s = i[a];
            r = o.call(t, s), i.splice(a, 1), a--
          }
          return r
        }), "function" == typeof e.formatArgs && (i = e.formatArgs.apply(t, i));
        var c = o.log || e.log || console.log.bind(console);
        c.apply(t, i)
      }
      r.enabled = !1, o.enabled = !0;
      var s = e.enabled(t) ? o : r;
      return s.namespace = t, s
    }

    function s(t) {
      e.save(t);
      for (var r = (t || "").split(/[\s,]+/), n = r.length, o = 0; o < n; o++) r[o] && (t = r[o].replace(/\*/g, ".*?"), "-" === t[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")))
    }

    function i() {
      e.enable("")
    }

    function a(t) {
      var r, n;
      for (r = 0, n = e.skips.length; r < n; r++)
        if (e.skips[r].test(t)) return !1;
      for (r = 0, n = e.names.length; r < n; r++)
        if (e.names[r].test(t)) return !0;
      return !1
    }

    function c(t) {
      return t instanceof Error ? t.stack || t.message : t
    }
    e = t.exports = o, e.coerce = c, e.disable = i, e.enable = s, e.enabled = a, e.humanize = r(23), e.names = [], e.skips = [], e.formatters = {};
    var u, h = 0
  }, function (t, e) {
    "use strict";

    function r(t) {
      if (t = "" + t, !(t.length > 1e4)) {
        var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);
        if (e) {
          var r = parseFloat(e[1]),
            n = (e[2] || "ms").toLowerCase();
          switch (n) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
              return r * h;
            case "days":
            case "day":
            case "d":
              return r * u;
            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
              return r * c;
            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
              return r * a;
            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
              return r * i;
            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
              return r
          }
        }
      }
    }

    function n(t) {
      return t >= u ? Math.round(t / u) + "d" : t >= c ? Math.round(t / c) + "h" : t >= a ? Math.round(t / a) + "m" : t >= i ? Math.round(t / i) + "s" : t + "ms"
    }

    function o(t) {
      return s(t, u, "day") || s(t, c, "hour") || s(t, a, "minute") || s(t, i, "second") || t + " ms"
    }

    function s(t, e, r) {
      if (!(t < e)) return t < 1.5 * e ? Math.floor(t / e) + " " + r : Math.ceil(t / e) + " " + r + "s"
    }
    var i = 1e3,
      a = 60 * i,
      c = 60 * a,
      u = 24 * c,
      h = 365.25 * u;
    t.exports = function (t, e) {
      return e = e || {}, "string" == typeof t ? r(t) : e["long"] ? o(t) : n(t)
    }
  }, function (t, e, r) {
    "use strict";
    var n = r(25);
    t.exports = {
      WebSocket: n
    }, null == navigator && (navigator = {}, navigator.userAgent = "WeApp")
  }, function (t, e, r) {
    "use strict";

    function n(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    var o = function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
          }
        }
        return function (e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e
        }
      }(),
      s = r(26),
      i = r(27),
      a = function () {
        function t(e) {
          var r = this;
          if (n(this, t), null == e) throw new TypeError("1 argument needed");
          try {
            var o = i.parse(e);
            if ("wss:" != o.protocol) throw new Error("protocol must be wss")
          } catch (s) {
            throw new SyntaxError("url in wrong format,protocol must be wss")
          }
          null != t.instance && (t.instance.close(), t.instance = null), t.instance = this, this.url = e, this.readyState = 0, this.onopen = null, this.onclose = null, this.onerror = null, this.onmessage = null, wx.connectSocket({
            url: e,
            header: {
              "content-type": "application/json"
            },
            method: "GET"
          }), wx.onSocketOpen(function () {
            r.readyState = t.OPEN, r.onopen && r.onopen.call(r), r.dispatchEvent({
              type: "open"
            })
          }), wx.onSocketError(function (t) {
            if ("" !== t.message) {
              var e = {
                type: "error",
                data: t
              };
              r.onerror && r.onerror.call(r, e), r.dispatchEvent(e)
            }
          }), wx.onSocketMessage(function (e) {
            if (r.readyState === t.OPEN || r.readyState === t.CLOSING) {
              var n = {
                type: "message",
                data: e.data
              };
              r.onmessage && r.onmessage.call(r, n), r.dispatchEvent(n)
            }
          }), wx.onSocketClose(function () {
            if (r.readyState = t.CLOSED, r.onclose) {
              var e = {
                type: "close",
                wasClean: !0,
                code: 0,
                reason: ""
              };
              r.onclose.call(r, e)
            }
          })
        }
        return o(t, [{
          key: "close",
          value: function () {
            wx.closeSocket()
          }
        }, {
          key: "send",
          value: function (t) {
            wx.sendSocketMessage({
              data: t
            })
          }
        }]), t
      }();
    a.prototype.addEventListener = s.addEventListener, a.prototype.removeEventListener = s.removeEventListener, a.prototype.dispatchEvent = s.dispatchEvent, a.CONNECTING = 0, a.OPEN = 1, a.CLOSING = 2, a.CLOSED = 3, a.instance = null, t.exports = a
  }, function (t, e) {
    "use strict";
    t.exports = function () {
      function t(t, e, r) {
        i.value = r, a(t, e, i), i.value = null
      }

      function e(e, r, n) {
        var o;
        u.call(e, r) ? o = e[r] : t(e, r, o = []), c.call(o, n) < 0 && o.push(n)
      }

      function r(t, e, r) {
        var n, o, s;
        if (u.call(t, e))
          for (r.target = t, n = t[e].slice(0), s = 0; s < n.length; s++) o = n[s], "function" == typeof o ? o.call(t, r) : "function" == typeof o.handleEvent && o.handleEvent(r)
      }

      function n(t, e, r) {
        var n, o;
        u.call(t, e) && (n = t[e], o = c.call(n, r), -1 < o && (n.splice(o, 1), n.length || delete t[e]))
      }
      var o = "@@",
        s = {},
        i = {
          configurable: !0,
          value: null
        },
        a = Object.defineProperty || function (t, e, r) {
          t[e] = r.value
        },
        c = [].indexOf || function (t) {
          for (var e = this.length; e-- && this[e] !== t;);
          return e
        },
        u = s.hasOwnProperty;
      return t(s, "addEventListener", function (t, r) {
        e(this, o + t, r)
      }), t(s, "dispatchEvent", function (t) {
        r(this, o + t.type, t)
      }), t(s, "removeEventListener", function (t, e) {
        n(this, o + t, e)
      }), s
    }()
  }, function (t, e, r) {
    "use strict";

    function n() {
      this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
    }

    function o(t, e, r) {
      if (t && u(t) && t instanceof n) return t;
      var o = new n;
      return o.parse(t, e, r), o
    }

    function s(t) {
      return c(t) && (t = o(t)), t instanceof n ? t.format() : n.prototype.format.call(t)
    }

    function i(t, e) {
      return o(t, !1, !0).resolve(e)
    }

    function a(t, e) {
      return t ? o(t, !1, !0).resolveObject(e) : e
    }

    function c(t) {
      return "string" == typeof t
    }

    function u(t) {
      return "object" === ("undefined" == typeof t ? "undefined" : l(t)) && null !== t
    }

    function h(t) {
      return null === t
    }

    function p(t) {
      return null == t
    }
    var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      },
      f = r(28);
    e.parse = o, e.resolve = i, e.resolveObject = a, e.format = s, e.Url = n;
    var d = /^([a-z0-9.+-]+:)/i,
      y = /:[0-9]*$/,
      g = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
      m = ["{", "}", "|", "\\", "^", "`"].concat(g),
      v = ["'"].concat(m),
      b = ["%", "/", "?", ";", "#"].concat(v),
      w = ["/", "?", "#"],
      k = 255,
      S = /^[a-z0-9A-Z_-]{0,63}$/,
      x = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
      A = {
        javascript: !0,
        "javascript:": !0
      },
      C = {
        javascript: !0,
        "javascript:": !0
      },
      B = {
        http: !0,
        https: !0,
        ftp: !0,
        gopher: !0,
        file: !0,
        "http:": !0,
        "https:": !0,
        "ftp:": !0,
        "gopher:": !0,
        "file:": !0
      },
      O = r(29);
    n.prototype.parse = function (t, e, r) {
      if (!c(t)) throw new TypeError("Parameter 'url' must be a string, not " + ("undefined" == typeof t ? "undefined" : l(t)));
      var n = t;
      n = n.trim();
      var o = d.exec(n);
      if (o) {
        o = o[0];
        var s = o.toLowerCase();
        this.protocol = s, n = n.substr(o.length)
      }
      if (r || o || n.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        var i = "//" === n.substr(0, 2);
        !i || o && C[o] || (n = n.substr(2), this.slashes = !0)
      }
      if (!C[o] && (i || o && !B[o])) {
        for (var a = -1, u = 0; u < w.length; u++) {
          var h = n.indexOf(w[u]);
          h !== -1 && (a === -1 || h < a) && (a = h)
        }
        var p, y;
        y = a === -1 ? n.lastIndexOf("@") : n.lastIndexOf("@", a), y !== -1 && (p = n.slice(0, y), n = n.slice(y + 1), this.auth = decodeURIComponent(p)), a = -1;
        for (var u = 0; u < b.length; u++) {
          var h = n.indexOf(b[u]);
          h !== -1 && (a === -1 || h < a) && (a = h)
        }
        a === -1 && (a = n.length), this.host = n.slice(0, a), n = n.slice(a), this.parseHost(), this.hostname = this.hostname || "";
        var g = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
        if (!g)
          for (var m = this.hostname.split(/\./), u = 0, P = m.length; u < P; u++) {
            var j = m[u];
            if (j && !j.match(S)) {
              for (var E = "", U = 0, L = j.length; U < L; U++) E += j.charCodeAt(U) > 127 ? "x" : j[U];
              if (!E.match(S)) {
                var T = m.slice(0, u),
                  I = m.slice(u + 1),
                  q = j.match(x);
                q && (T.push(q[1]), I.unshift(q[2])), I.length && (n = "/" + I.join(".") + n), this.hostname = T.join(".");
                break
              }
            }
          }
        if (this.hostname.length > k ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), !g) {
          for (var R = this.hostname.split("."), D = [], u = 0; u < R.length; ++u) {
            var M = R[u];
            D.push(M.match(/[^A-Za-z0-9_-]/) ? "xn--" + f.encode(M) : M)
          }
          this.hostname = D.join(".")
        }
        var z = this.port ? ":" + this.port : "",
          N = this.hostname || "";
        this.host = N + z, this.href += this.host, g && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== n[0] && (n = "/" + n))
      }
      if (!A[s])
        for (var u = 0, P = v.length; u < P; u++) {
          var _ = v[u],
            H = encodeURIComponent(_);
          H === _ && (H = escape(_)), n = n.split(_).join(H)
        }
      var F = n.indexOf("#");
      F !== -1 && (this.hash = n.substr(F), n = n.slice(0, F));
      var J = n.indexOf("?");
      if (J !== -1 ? (this.search = n.substr(J), this.query = n.substr(J + 1), e && (this.query = O.parse(this.query)), n = n.slice(0, J)) : e && (this.search = "", this.query = {}), n && (this.pathname = n), B[s] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
        var z = this.pathname || "",
          M = this.search || "";
        this.path = z + M
      }
      return this.href = this.format(), this
    }, n.prototype.format = function () {
      var t = this.auth || "";
      t && (t = encodeURIComponent(t), t = t.replace(/%3A/i, ":"), t += "@");
      var e = this.protocol || "",
        r = this.pathname || "",
        n = this.hash || "",
        o = !1,
        s = "";
      this.host ? o = t + this.host : this.hostname && (o = t + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (o += ":" + this.port)), this.query && u(this.query) && Object.keys(this.query).length && (s = O.stringify(this.query));
      var i = this.search || s && "?" + s || "";
      return e && ":" !== e.substr(-1) && (e += ":"), this.slashes || (!e || B[e]) && o !== !1 ? (o = "//" + (o || ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : o || (o = ""), n && "#" !== n.charAt(0) && (n = "#" + n), i && "?" !== i.charAt(0) && (i = "?" + i), r = r.replace(/[?#]/g, function (t) {
        return encodeURIComponent(t)
      }), i = i.replace("#", "%23"), e + o + r + i + n
    }, n.prototype.resolve = function (t) {
      return this.resolveObject(o(t, !1, !0)).format()
    }, n.prototype.resolveObject = function (t) {
      if (c(t)) {
        var e = new n;
        e.parse(t, !1, !0), t = e
      }
      var r = new n;
      if (Object.keys(this).forEach(function (t) {
          r[t] = this[t]
        }, this), r.hash = t.hash, "" === t.href) return r.href = r.format(), r;
      if (t.slashes && !t.protocol) return Object.keys(t).forEach(function (e) {
        "protocol" !== e && (r[e] = t[e])
      }), B[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r;
      if (t.protocol && t.protocol !== r.protocol) {
        if (!B[t.protocol]) return Object.keys(t).forEach(function (e) {
          r[e] = t[e]
        }), r.href = r.format(), r;
        if (r.protocol = t.protocol, t.host || C[t.protocol]) r.pathname = t.pathname;
        else {
          for (var o = (t.pathname || "").split("/"); o.length && !(t.host = o.shift()););
          t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== o[0] && o.unshift(""), o.length < 2 && o.unshift(""), r.pathname = o.join("/")
        }
        if (r.search = t.search, r.query = t.query, r.host = t.host || "", r.auth = t.auth, r.hostname = t.hostname || t.host, r.port = t.port, r.pathname || r.search) {
          var s = r.pathname || "",
            i = r.search || "";
          r.path = s + i
        }
        return r.slashes = r.slashes || t.slashes, r.href = r.format(), r
      }
      var a = r.pathname && "/" === r.pathname.charAt(0),
        u = t.host || t.pathname && "/" === t.pathname.charAt(0),
        l = u || a || r.host && t.pathname,
        f = l,
        d = r.pathname && r.pathname.split("/") || [],
        o = t.pathname && t.pathname.split("/") || [],
        y = r.protocol && !B[r.protocol];
      if (y && (r.hostname = "", r.port = null, r.host && ("" === d[0] ? d[0] = r.host : d.unshift(r.host)), r.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === o[0] ? o[0] = t.host : o.unshift(t.host)), t.host = null), l = l && ("" === o[0] || "" === d[0])), u) r.host = t.host || "" === t.host ? t.host : r.host, r.hostname = t.hostname || "" === t.hostname ? t.hostname : r.hostname, r.search = t.search, r.query = t.query, d = o;
      else if (o.length) d || (d = []), d.pop(), d = d.concat(o), r.search = t.search, r.query = t.query;
      else if (!p(t.search)) {
        if (y) {
          r.hostname = r.host = d.shift();
          var g = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@");
          g && (r.auth = g.shift(), r.host = r.hostname = g.shift())
        }
        return r.search = t.search, r.query = t.query, h(r.pathname) && h(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r
      }
      if (!d.length) return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, r.href = r.format(), r;
      for (var m = d.slice(-1)[0], v = (r.host || t.host) && ("." === m || ".." === m) || "" === m, b = 0, w = d.length; w >= 0; w--) m = d[w], "." == m ? d.splice(w, 1) : ".." === m ? (d.splice(w, 1), b++) : b && (d.splice(w, 1), b--);
      if (!l && !f)
        for (; b--; b) d.unshift("..");
      !l || "" === d[0] || d[0] && "/" === d[0].charAt(0) || d.unshift(""), v && "/" !== d.join("/").substr(-1) && d.push("");
      var k = "" === d[0] || d[0] && "/" === d[0].charAt(0);
      if (y) {
        r.hostname = r.host = k ? "" : d.length ? d.shift() : "";
        var g = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@");
        g && (r.auth = g.shift(), r.host = r.hostname = g.shift())
      }
      return l = l || r.host && d.length, l && !k && d.unshift(""), d.length ? r.pathname = d.join("/") : (r.pathname = null, r.path = null), h(r.pathname) && h(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = t.auth || r.auth, r.slashes = r.slashes || t.slashes, r.href = r.format(), r
    }, n.prototype.parseHost = function () {
      var t = this.host,
        e = y.exec(t);
      e && (e = e[0], ":" !== e && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t)
    }
  }, function (t, e, r) {
    var n;
    (function (t) {
      "use strict";
      var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      };
      ! function (s) {
        function i(t) {
          throw RangeError(q[t])
        }

        function a(t, e) {
          for (var r = t.length, n = []; r--;) n[r] = e(t[r]);
          return n
        }

        function c(t, e) {
          var r = t.split("@"),
            n = "";
          r.length > 1 && (n = r[0] + "@", t = r[1]), t = t.replace(I, ".");
          var o = t.split("."),
            s = a(o, e).join(".");
          return n + s
        }

        function u(t) {
          for (var e, r, n = [], o = 0, s = t.length; o < s;) e = t.charCodeAt(o++), e >= 55296 && e <= 56319 && o < s ? (r = t.charCodeAt(o++), 56320 == (64512 & r) ? n.push(((1023 & e) << 10) + (1023 & r) + 65536) : (n.push(e), o--)) : n.push(e);
          return n
        }

        function h(t) {
          return a(t, function (t) {
            var e = "";
            return t > 65535 && (t -= 65536, e += M(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e += M(t)
          }).join("")
        }

        function p(t) {
          return t - 48 < 10 ? t - 22 : t - 65 < 26 ? t - 65 : t - 97 < 26 ? t - 97 : A
        }

        function l(t, e) {
          return t + 22 + 75 * (t < 26) - ((0 != e) << 5)
        }

        function f(t, e, r) {
          var n = 0;
          for (t = r ? D(t / P) : t >> 1, t += D(t / e); t > R * B >> 1; n += A) t = D(t / R);
          return D(n + (R + 1) * t / (t + O))
        }

        function d(t) {
          var e, r, n, o, s, a, c, u, l, d, y = [],
            g = t.length,
            m = 0,
            v = E,
            b = j;
          for (r = t.lastIndexOf(U), r < 0 && (r = 0), n = 0; n < r; ++n) t.charCodeAt(n) >= 128 && i("not-basic"), y.push(t.charCodeAt(n));
          for (o = r > 0 ? r + 1 : 0; o < g;) {
            for (s = m, a = 1, c = A; o >= g && i("invalid-input"), u = p(t.charCodeAt(o++)), (u >= A || u > D((x - m) / a)) && i("overflow"), m += u * a, l = c <= b ? C : c >= b + B ? B : c - b, !(u < l); c += A) d = A - l, a > D(x / d) && i("overflow"), a *= d;
            e = y.length + 1, b = f(m - s, e, 0 == s), D(m / e) > x - v && i("overflow"), v += D(m / e), m %= e, y.splice(m++, 0, v)
          }
          return h(y)
        }

        function y(t) {
          var e, r, n, o, s, a, c, h, p, d, y, g, m, v, b, w = [];
          for (t = u(t), g = t.length, e = E, r = 0, s = j, a = 0; a < g; ++a) y = t[a], y < 128 && w.push(M(y));
          for (n = o = w.length, o && w.push(U); n < g;) {
            for (c = x, a = 0; a < g; ++a) y = t[a], y >= e && y < c && (c = y);
            for (m = n + 1, c - e > D((x - r) / m) && i("overflow"), r += (c - e) * m, e = c, a = 0; a < g; ++a)
              if (y = t[a], y < e && ++r > x && i("overflow"), y == e) {
                for (h = r, p = A; d = p <= s ? C : p >= s + B ? B : p - s, !(h < d); p += A) b = h - d, v = A - d, w.push(M(l(d + b % v, 0))), h = D(b / v);
                w.push(M(l(h, 0))), s = f(r, m, n == o), r = 0, ++n
              }++ r, ++e
          }
          return w.join("")
        }

        function g(t) {
          return c(t, function (t) {
            return L.test(t) ? d(t.slice(4).toLowerCase()) : t
          })
        }

        function m(t) {
          return c(t, function (t) {
            return T.test(t) ? "xn--" + y(t) : t
          })
        }
        var v = "object" == o(e) && e && !e.nodeType && e,
          b = "object" == o(t) && t && !t.nodeType && t,
          w = "object" == ("undefined" == typeof global ? "undefined" : o(global)) && global;
        w.global !== w && w.window !== w && w.self !== w || (s = w);
        var k, S, x = 2147483647,
          A = 36,
          C = 1,
          B = 26,
          O = 38,
          P = 700,
          j = 72,
          E = 128,
          U = "-",
          L = /^xn--/,
          T = /[^\x20-\x7E]/,
          I = /[\x2E\u3002\uFF0E\uFF61]/g,
          q = {
            overflow: "Overflow: input needs wider integers to process",
            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
            "invalid-input": "Invalid input"
          },
          R = A - C,
          D = Math.floor,
          M = String.fromCharCode;
        if (k = {
            version: "1.3.2",
            ucs2: {
              decode: u,
              encode: h
            },
            decode: d,
            encode: y,
            toASCII: m,
            toUnicode: g
          }, "object" == o(r(14)) && r(14)) n = function () {
          return k
        }.call(e, r, e, t), !(void 0 !== n && (t.exports = n));
        else if (v && b)
          if (t.exports == v) b.exports = k;
          else
            for (S in k) k.hasOwnProperty(S) && (v[S] = k[S]);
        else s.punycode = k
      }(void 0)
    }).call(e, r(13)(t))
  }, function (t, e, r) {
    "use strict";
    e.decode = e.parse = r(30), e.encode = e.stringify = r(31)
  }, function (t, e) {
    "use strict";

    function r(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }
    t.exports = function (t, e, n, o) {
      e = e || "&", n = n || "=";
      var s = {};
      if ("string" != typeof t || 0 === t.length) return s;
      var i = /\+/g;
      t = t.split(e);
      var a = 1e3;
      o && "number" == typeof o.maxKeys && (a = o.maxKeys);
      var c = t.length;
      a > 0 && c > a && (c = a);
      for (var u = 0; u < c; ++u) {
        var h, p, l, f, d = t[u].replace(i, "%20"),
          y = d.indexOf(n);
        y >= 0 ? (h = d.substr(0, y), p = d.substr(y + 1)) : (h = d, p = ""), l = decodeURIComponent(h), f = decodeURIComponent(p), r(s, l) ? Array.isArray(s[l]) ? s[l].push(f) : s[l] = [s[l], f] : s[l] = f
      }
      return s
    }
  }, function (t, e) {
    "use strict";
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      },
      n = function (t) {
        switch ("undefined" == typeof t ? "undefined" : r(t)) {
          case "string":
            return t;
          case "boolean":
            return t ? "true" : "false";
          case "number":
            return isFinite(t) ? t : "";
          default:
            return ""
        }
      };
    t.exports = function (t, e, o, s) {
      return e = e || "&", o = o || "=", null === t && (t = void 0), "object" === ("undefined" == typeof t ? "undefined" : r(t)) ? Object.keys(t).map(function (r) {
        var s = encodeURIComponent(n(r)) + o;
        return Array.isArray(t[r]) ? t[r].map(function (t) {
          return s + encodeURIComponent(n(t))
        }).join(e) : s + encodeURIComponent(n(t[r]))
      }).join(e) : s ? encodeURIComponent(n(s)) + o + encodeURIComponent(n(t)) : ""
    }
  }, function (t, e) {
    "use strict";
    var r = [].indexOf;
    t.exports = function (t, e) {
      if (r) return t.indexOf(e);
      for (var n = 0; n < t.length; ++n)
        if (t[n] === e) return n;
      return -1
    }
  }, function (t, e) {
    "use strict";
    var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
      n = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
    t.exports = function (t) {
      var e = t,
        o = t.indexOf("["),
        s = t.indexOf("]");
      o != -1 && s != -1 && (t = t.substring(0, o) + t.substring(o, s).replace(/:/g, ";") + t.substring(s, t.length));
      for (var i = r.exec(t || ""), a = {}, c = 14; c--;) a[n[c]] = i[c] || "";
      return o != -1 && s != -1 && (a.source = e, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = !0), a
    }
  }])
});
(function (ns) {
  var CLIENT_VERSION = "2.4.4";
  var CLIENT_TYPE = "WX";
  ns.wrapper = function (goog, wd) {
    var h, n = this;

    function p(a) {
      return void 0 !== a
    }

    function aa() {}

    function ba(a) {
      a.Vb = function () {
        return a.We ? a.We : a.We = new a
      }
    }

    function da(a) {
      var b = typeof a;
      if ("object" == b)
        if (a) {
          if (a instanceof Array) return "array";
          if (a instanceof Object) return b;
          var c = Object.prototype.toString.call(a);
          if ("[object Window]" == c) return "object";
          if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
          if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
        } else return "null";
      else if ("function" == b && "undefined" == typeof a.call) return "object";
      return b
    }

    function ea(a) {
      return "array" == da(a)
    }

    function q(a) {
      return "string" == typeof a
    }

    function fa(a) {
      return "number" == typeof a
    }

    function ga(a) {
      return "function" == da(a)
    }

    function ha(a) {
      var b = typeof a;
      return "object" == b && null != a || "function" == b
    }

    function ia(a, b, c) {
      return a.call.apply(a.bind, arguments)
    }

    function ja(a, b, c) {
      if (!a) throw Error();
      if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function () {
          var c = Array.prototype.slice.call(arguments);
          Array.prototype.unshift.apply(c, d);
          return a.apply(b, c)
        }
      }
      return function () {
        return a.apply(b, arguments)
      }
    }

    function r(a, b, c) {
      r = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ia : ja;
      return r.apply(null, arguments)
    }

    function ka(a, b) {
      var c = a.split("."),
        d = n;
      c[0] in d || !d.execScript || d.execScript("var " + c[0]);
      for (var e; c.length && (e = c.shift());) !c.length && p(b) ? d[e] = b : d = d[e] ? d[e] : d[e] = {}
    }

    function la(a, b) {
      function c() {}
      c.prototype = b.prototype;
      a.hh = b.prototype;
      a.prototype = new c;
      a.prototype.constructor = a;
      a.Xg = function (a, c, f) {
        for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) d[e - 2] = arguments[e];
        return b.prototype[c].apply(a, d)
      }
    };
    var ma = {},
      na = {
        NETWORK_ERROR: "Unable to contact the Wilddog server.",
        SERVER_ERROR: "An unknown server error occurred.",
        TRANSPORT_UNAVAILABLE: "There are no login transports available for the requested method.",
        REQUEST_INTERRUPTED: "The browser redirected the page before the login request could complete.",
        USER_CANCELLED: "The user cancelled authentication."
      };

    function oa(a) {
      var b = t(na, a),
        b = Error(b, a);
      b.code = a;
      return b
    };

    function pa(a, b) {
      return Object.prototype.hasOwnProperty.call(a, b)
    }

    function t(a, b) {
      if (Object.prototype.hasOwnProperty.call(a, b)) return a[b]
    }

    function qa(a, b) {
      for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c])
    }

    function ra(a) {
      var b = {};
      qa(a, function (a, d) {
        b[a] = d
      });
      return b
    };

    function sa(a) {
      var b = [];
      qa(a, function (a, d) {
        ea(d) ? ta(d, function (c) {
          b.push(encodeURIComponent(a) + "=" + encodeURIComponent(c))
        }) : b.push(encodeURIComponent(a) + "=" + encodeURIComponent(d))
      });
      return b.length ? "&" + b.join("&") : ""
    }

    function ua(a) {
      var b = {};
      a = a.replace(/^\?/, "").split("&");
      ta(a, function (a) {
        a && (a = a.split("="), b[a[0]] = a[1])
      });
      return b
    };

    function va(a) {
      return /^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
    }

    function wa(a) {
      a = String(a);
      if (va(a)) try {
        return eval("(" + a + ")")
      } catch (b) {}
      throw Error("Invalid JSON string: " + a);
    }

    function xa() {
      this.Dd = void 0
    }

    function ya(a, b, c) {
      if (null == b) c.push("null");
      else {
        if ("object" == typeof b) {
          if (ea(b)) {
            var d = b;
            b = d.length;
            c.push("[");
            for (var e = "", f = 0; f < b; f++) c.push(e), e = d[f], ya(a, a.Dd ? a.Dd.call(d, String(f), e) : e, c), e = ",";
            c.push("]");
            return
          }
          if (b instanceof String || b instanceof Number || b instanceof Boolean) b = b.valueOf();
          else {
            c.push("{");
            f = "";
            for (d in b) Object.prototype.hasOwnProperty.call(b, d) && (e = b[d], "function" != typeof e && (c.push(f), za(d, c), c.push(":"), ya(a, a.Dd ? a.Dd.call(b, d, e) : e, c), f = ","));
            c.push("}");
            return
          }
        }
        switch (typeof b) {
          case "string":
            za(b,
              c);
            break;
          case "number":
            c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
            break;
          case "boolean":
            c.push(String(b));
            break;
          case "function":
            c.push("null");
            break;
          default:
            throw Error("Unknown type: " + typeof b);
        }
      }
    }
    var Aa = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
      },
      Ba = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;

    function za(a, b) {
      b.push('"', a.replace(Ba, function (a) {
        var b = Aa[a];
        b || (b = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1), Aa[a] = b);
        return b
      }), '"')
    };

    function Ca(a) {
      return "undefined" !== typeof JSON && p(JSON.parse) ? JSON.parse(a) : wa(a)
    }

    function u(a) {
      if ("undefined" !== typeof JSON && p(JSON.stringify)) a = JSON.stringify(a);
      else {
        var b = [];
        ya(new xa, a, b);
        a = b.join("")
      }
      return a
    };

    function Da(a) {
      a.method || (a.method = "GET");
      a.headers || (a.headers = {});
      this.options = a
    }
    Da.prototype.open = function (a, b, c) {
      var d = {
        Accept: "application/json;text/plain"
      };
      Ea(d, this.options.headers);
      a = {
        url: a,
        method: this.options.method.toUpperCase(),
        header: d,
        success: function (a) {
          c && (c(null, a.data), c = null)
        },
        fail: function (a) {
          500 <= a.Be && 600 > a.Be ? c(oa("SERVER_ERROR")) : c(oa("NETWORK_ERROR"));
          c = null
        }
      };
      a.data = b;
      a.headers = d;
      wx.request(a)
    };
    Da.isAvailable = function () {
      return wx && wx.request
    };
    var Fa = "auth.wilddog.com";

    function Ga() {
      var a = window.opener.frames,
        b;
      for (b = a.length - 1; 0 <= b; b--) try {
        if (a[b].location.protocol === window.location.protocol && a[b].location.host === window.location.host && "__winchan_relay_frame" === a[b].name) return a[b]
      } catch (c) {}
      return null
    }

    function Ha(a, b, c) {
      a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener && a.addEventListener(b, c, !1)
    }

    function Ia(a, b) {
      a.detachEvent ? a.detachEvent("onmessage", b) : a.removeEventListener && a.removeEventListener("message", b, !1)
    }

    function Ja() {
      var a = document.location.hash,
        b = "";
      try {
        var a = a.replace("#", ""),
          c = ua(a);
        c && pa(c, "__wilddog_request_key") && (b = t(c, "__wilddog_request_key"))
      } catch (d) {}
      return b
    }

    function Ka() {
      var a = La(Fa);
      return a.scheme + "://" + a.host + "/v2"
    }

    function Ma(a) {
      return Ka() + "/" + a + "/auth/channel"
    };

    function Na() {
      if ("undefined" === typeof navigator) return !1;
      var a = navigator.userAgent;
      if ("Microsoft Internet Explorer" === navigator.appName) {
        if ((a = a.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/)) && 1 < a.length) return 8 <= parseFloat(a[1])
      } else if (-1 < a.indexOf("Trident") && (a = a.match(/rv:([0-9]{2,2}[\.0-9]{0,})/)) && 1 < a.length) return 8 <= parseFloat(a[1]);
      return !1
    };

    function Oa() {}
    Oa.prototype.open = function (a, b, c) {
      wx.login({
        success: function (b) {
          b.code ? Pa(function (d, f) {
            if (d) c(d);
            else {
              var e = {};
              e.code = b.code;
              e.signature = f.signature;
              e.rawData = f.rawData;
              Qa(e, a, c)
            }
          }) : c(Error("\u5fae\u4fe1\u670d\u52a1\u7aef\u672a\u8fd4\u56decode"))
        },
        fail: function (a) {
          Ra("debug  WxImplicit fail" + JSON.stringify(a));
          c(Error("\u83b7\u53d6\u7528\u6237\u767b\u9646\u72b6\u6001\u5931\u8d25,res.Msg:" + a.Zg), null)
        }
      })
    };

    function Qa(a, b, c) {
      wx.request({
        url: b,
        method: "POST",
        header: {
          Accept: "application/json;text/plain"
        },
        success: function (a) {
          a.data ? null != a.data.idToken ? c(null, a.data) : a.data.error ? c(Error(a.data.error)) : c(Error("unkown error:" + a.data)) : c(Error("unkown error: no data returned"));
          c = null
        },
        fail: function (a) {
          500 <= a.Be && 600 > a.Be ? c(oa("SERVER_ERROR")) : c(oa("NETWORK_ERROR"));
          c = null
        },
        data: a
      })
    }

    function Pa(a) {
      wx.getUserInfo({
        success: function (b) {
          a(null, {
            rawData: b.rawData,
            signature: b.signature
          })
        },
        fail: function () {
          a(Error("invoke wx.getUserInfo failed"))
        }
      })
    }
    Oa.isAvailable = function () {
      return wx && wx.request
    };

    function Sa() {
      this.rc = {}
    }
    Sa.prototype.set = function (a, b) {
      null == b ? delete this.rc[a] : this.rc[a] = b
    };
    Sa.prototype.get = function (a) {
      return pa(this.rc, a) ? this.rc[a] : null
    };
    Sa.prototype.remove = function (a) {
      delete this.rc[a]
    };

    function Ta() {
      this.mg = "wilddog123:"
    }
    h = Ta.prototype;
    h.set = function (a, b) {
      null == b ? wx.removeStorageSync(this.Ad(a)) : wx.setStorageSync(this.Ad(a), b)
    };
    h.get = function (a) {
      var b;
      try {
        b = wx.getStorageSync(this.Ad(a))
      } catch (c) {}
      return null == b || "" == b ? null : b
    };
    h.Ad = function (a) {
      return this.mg + a
    };
    h.remove = function (a) {
      wx.removeStorageSync(this.Ad(a))
    };
    h.toString = function () {
      return "wx-storage:{}"
    };
    var Ua = new Ta,
      v = new Sa;

    function Va(a) {
      if (Error.captureStackTrace) Error.captureStackTrace(this, Va);
      else {
        var b = Error().stack;
        b && (this.stack = b)
      }
      a && (this.message = String(a))
    }
    la(Va, Error);
    Va.prototype.name = "CustomError";

    function Wa(a, b, c) {
      this.ea = c;
      this.Of = a;
      this.rg = b;
      this.ud = 0;
      this.jd = null
    }
    Wa.prototype.get = function () {
      var a;
      0 < this.ud ? (this.ud--, a = this.jd, this.jd = a.next, a.next = null) : a = this.Of();
      return a
    };
    Wa.prototype.put = function (a) {
      this.rg(a);
      this.ud < this.ea && (this.ud++, a.next = this.jd, this.jd = a)
    };

    function Xa() {
      this.Sd = this.pc = null
    }
    var Za = new Wa(function () {
      return new Ya
    }, function (a) {
      a.reset()
    }, 100);
    Xa.prototype.add = function (a, b) {
      var c = Za.get();
      c.set(a, b);
      this.Sd ? this.Sd.next = c : this.pc = c;
      this.Sd = c
    };
    Xa.prototype.remove = function () {
      var a = null;
      this.pc && (a = this.pc, this.pc = this.pc.next, this.pc || (this.Sd = null), a.next = null);
      return a
    };

    function Ya() {
      this.next = this.scope = this.ce = null
    }
    Ya.prototype.set = function (a, b) {
      this.ce = a;
      this.scope = b;
      this.next = null
    };
    Ya.prototype.reset = function () {
      this.next = this.scope = this.ce = null
    };
    var $a = Array.prototype.indexOf ? function (a, b, c) {
        return Array.prototype.indexOf.call(a, b, c)
      } : function (a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (q(a)) return q(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++)
          if (c in a && a[c] === b) return c;
        return -1
      },
      ta = Array.prototype.forEach ? function (a, b, c) {
        Array.prototype.forEach.call(a, b, c)
      } : function (a, b, c) {
        for (var d = a.length, e = q(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
      },
      ab = Array.prototype.filter ? function (a, b, c) {
        return Array.prototype.filter.call(a,
          b, c)
      } : function (a, b, c) {
        for (var d = a.length, e = [], f = 0, g = q(a) ? a.split("") : a, k = 0; k < d; k++)
          if (k in g) {
            var l = g[k];
            b.call(c, l, k, a) && (e[f++] = l)
          } return e
      },
      bb = Array.prototype.map ? function (a, b, c) {
        return Array.prototype.map.call(a, b, c)
      } : function (a, b, c) {
        for (var d = a.length, e = Array(d), f = q(a) ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
        return e
      },
      cb = Array.prototype.reduce ? function (a, b, c, d) {
        d && (b = r(b, d));
        return Array.prototype.reduce.call(a, b, c)
      } : function (a, b, c, d) {
        var e = c;
        ta(a, function (c, g) {
          e = b.call(d,
            e, c, g, a)
        });
        return e
      },
      db = Array.prototype.every ? function (a, b, c) {
        return Array.prototype.every.call(a, b, c)
      } : function (a, b, c) {
        for (var d = a.length, e = q(a) ? a.split("") : a, f = 0; f < d; f++)
          if (f in e && !b.call(c, e[f], f, a)) return !1;
        return !0
      };

    function eb(a, b) {
      var c = fb(a, b, void 0);
      return 0 > c ? null : q(a) ? a.charAt(c) : a[c]
    }

    function fb(a, b, c) {
      for (var d = a.length, e = q(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a)) return f;
      return -1
    }

    function gb(a, b) {
      var c = $a(a, b);
      0 <= c && Array.prototype.splice.call(a, c, 1)
    }

    function hb(a, b) {
      a.sort(b || ib)
    }

    function ib(a, b) {
      return a > b ? 1 : a < b ? -1 : 0
    };
    var jb;
    a: {
      var kb = n.navigator;
      if (kb) {
        var lb = kb.userAgent;
        if (lb) {
          jb = lb;
          break a
        }
      }
      jb = ""
    };

    function w(a, b) {
      for (var c in a) b.call(void 0, a[c], c, a)
    }

    function mb(a, b) {
      var c = {},
        d;
      for (d in a) c[d] = b.call(void 0, a[d], d, a);
      return c
    }

    function nb(a, b) {
      for (var c in a)
        if (!b.call(void 0, a[c], c, a)) return !1;
      return !0
    }

    function ob(a) {
      var b = 0,
        c;
      for (c in a) b++;
      return b
    }

    function pb(a) {
      for (var b in a) return b
    }

    function qb(a) {
      var b = [],
        c = 0,
        d;
      for (d in a) b[c++] = a[d];
      return b
    }

    function rb(a) {
      var b = [],
        c = 0,
        d;
      for (d in a) b[c++] = d;
      return b
    }

    function sb(a, b) {
      return null !== a && b in a
    }

    function tb(a, b) {
      for (var c in a)
        if (a[c] == b) return !0;
      return !1
    }

    function ub(a, b, c) {
      for (var d in a)
        if (b.call(c, a[d], d, a)) return d
    }

    function vb(a, b) {
      var c = ub(a, b, void 0);
      return c && a[c]
    }

    function wb(a) {
      for (var b in a) return !1;
      return !0
    }

    function xb(a) {
      var b = {},
        c;
      for (c in a) b[c] = a[c];
      return b
    }
    var yb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function Ea(a, b) {
      for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (var f = 0; f < yb.length; f++) c = yb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
      }
    };

    function zb(a) {
      n.setTimeout(function () {
        throw a;
      }, 0)
    }
    var Ab;

    function Bb() {
      var a = n.MessageChannel;
      "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && -1 == jb.indexOf("Presto") && (a = function () {
        var a = document.createElement("IFRAME");
        a.style.display = "none";
        a.src = "";
        document.documentElement.appendChild(a);
        var b = a.contentWindow,
          a = b.document;
        a.open();
        a.write("");
        a.close();
        var c = "callImmediate" + Math.random(),
          d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host,
          a = r(function (a) {
            if (("*" == d || a.origin ==
                d) && a.data == c) this.port1.onmessage()
          }, this);
        b.addEventListener("message", a, !1);
        this.port1 = {};
        this.port2 = {
          postMessage: function () {
            b.postMessage(c, d)
          }
        }
      });
      if ("undefined" !== typeof a && -1 == jb.indexOf("Trident") && -1 == jb.indexOf("MSIE")) {
        var b = new a,
          c = {},
          d = c;
        b.port1.onmessage = function () {
          if (p(c.next)) {
            c = c.next;
            var a = c.jb;
            c.jb = null;
            a()
          }
        };
        return function (a) {
          d.next = {
            jb: a
          };
          d = d.next;
          b.port2.postMessage(0)
        }
      }
      return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function (a) {
        var b =
          document.createElement("SCRIPT");
        b.onreadystatechange = function () {
          b.onreadystatechange = null;
          b.parentNode.removeChild(b);
          b = null;
          a();
          a = null
        };
        document.documentElement.appendChild(b)
      } : function (a) {
        n.setTimeout(a, 0)
      }
    };

    function Cb(a, b) {
      Db || Eb();
      Fb || (Db(), Fb = !0);
      Gb.add(a, b)
    }
    var Db;

    function Eb() {
      var a = n.Promise;
      if (-1 != String(a).indexOf("[native code]")) {
        var b = a.resolve(void 0);
        Db = function () {
          b.then(Hb)
        }
      } else Db = function () {
        var a = Hb,
          b;
        !(b = !ga(n.setImmediate)) && (b = n.Window && n.Window.prototype) && (b = -1 == jb.indexOf("Edge") && n.Window.prototype.setImmediate == n.setImmediate);
        b ? (Ab || (Ab = Bb()), Ab(a)) : n.setImmediate(a)
      }
    }
    var Fb = !1,
      Gb = new Xa;

    function Hb() {
      for (var a; a = Gb.remove();) {
        try {
          a.ce.call(a.scope)
        } catch (b) {
          zb(b)
        }
        Za.put(a)
      }
      Fb = !1
    };

    function Ib(a, b) {
      this.Z = Jb;
      this.qf = void 0;
      this.Ob = this.ib = this.Ba = null;
      this.fd = this.ae = !1;
      if (a != aa) try {
        var c = this;
        a.call(b, function (a) {
          Kb(c, Lb, a)
        }, function (a) {
          if (!(a instanceof Mb)) try {
            if (a instanceof Error) throw a;
            throw Error("Promise rejected.");
          } catch (e) {}
          Kb(c, Nb, a)
        })
      } catch (d) {
        Kb(this, Nb, d)
      }
    }
    var Jb = 0,
      Lb = 2,
      Nb = 3;

    function Ob() {
      this.next = this.context = this.gc = this.Lc = this.u = null;
      this.Uc = !1
    }
    Ob.prototype.reset = function () {
      this.context = this.gc = this.Lc = this.u = null;
      this.Uc = !1
    };
    var Pb = new Wa(function () {
      return new Ob
    }, function (a) {
      a.reset()
    }, 100);

    function Qb(a, b, c) {
      var d = Pb.get();
      d.Lc = a;
      d.gc = b;
      d.context = c;
      return d
    }
    Ib.prototype.then = function (a, b, c) {
      return Rb(this, ga(a) ? a : null, ga(b) ? b : null, c)
    };
    Ib.prototype.then = Ib.prototype.then;
    Ib.prototype.$goog_Thenable = !0;
    h = Ib.prototype;
    h.Kg = function (a, b) {
      return Rb(this, null, a, b)
    };
    h.cancel = function (a) {
      this.Z == Jb && Cb(function () {
        var b = new Mb(a);
        Sb(this, b)
      }, this)
    };

    function Sb(a, b) {
      if (a.Z == Jb)
        if (a.Ba) {
          var c = a.Ba;
          if (c.ib) {
            for (var d = 0, e = null, f = null, g = c.ib; g && (g.Uc || (d++, g.u == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
            e && (c.Z == Jb && 1 == d ? Sb(c, b) : (f ? (d = f, d.next == c.Ob && (c.Ob = d), d.next = d.next.next) : Tb(c), Ub(c, e, Nb, b)))
          }
          a.Ba = null
        } else Kb(a, Nb, b)
    }

    function Vb(a, b) {
      a.ib || a.Z != Lb && a.Z != Nb || Wb(a);
      a.Ob ? a.Ob.next = b : a.ib = b;
      a.Ob = b
    }

    function Rb(a, b, c, d) {
      var e = Qb(null, null, null);
      e.u = new Ib(function (a, g) {
        e.Lc = b ? function (c) {
          try {
            var e = b.call(d, c);
            a(e)
          } catch (m) {
            g(m)
          }
        } : a;
        e.gc = c ? function (b) {
          try {
            var e = c.call(d, b);
            !p(e) && b instanceof Mb ? g(b) : a(e)
          } catch (m) {
            g(m)
          }
        } : g
      });
      e.u.Ba = a;
      Vb(a, e);
      return e.u
    }
    h.Mg = function (a) {
      this.Z = Jb;
      Kb(this, Lb, a)
    };
    h.Ng = function (a) {
      this.Z = Jb;
      Kb(this, Nb, a)
    };

    function Kb(a, b, c) {
      if (a.Z == Jb) {
        a === c && (b = Nb, c = new TypeError("Promise cannot resolve to itself"));
        a.Z = 1;
        var d;
        a: {
          var e = c,
            f = a.Mg,
            g = a.Ng;
          if (e instanceof Ib) Vb(e, Qb(f || aa, g || null, a)),
          d = !0;
          else {
            var k;
            if (e) try {
              k = !!e.$goog_Thenable
            } catch (m) {
              k = !1
            } else k = !1;
            if (k) e.then(f, g, a), d = !0;
            else {
              if (ha(e)) try {
                var l = e.then;
                if (ga(l)) {
                  Xb(e, l, f, g, a);
                  d = !0;
                  break a
                }
              } catch (m) {
                g.call(a, m);
                d = !0;
                break a
              }
              d = !1
            }
          }
        }
        d || (a.qf = c, a.Z = b, a.Ba = null, Wb(a), b != Nb || c instanceof Mb || Yb(a, c))
      }
    }

    function Xb(a, b, c, d, e) {
      function f(a) {
        k || (k = !0, d.call(e, a))
      }

      function g(a) {
        k || (k = !0, c.call(e, a))
      }
      var k = !1;
      try {
        b.call(a, g, f)
      } catch (l) {
        f(l)
      }
    }

    function Wb(a) {
      a.ae || (a.ae = !0, Cb(a.Tf, a))
    }

    function Tb(a) {
      var b = null;
      a.ib && (b = a.ib, a.ib = b.next, b.next = null);
      a.ib || (a.Ob = null);
      return b
    }
    h.Tf = function () {
      for (var a; a = Tb(this);) Ub(this, a, this.Z, this.qf);
      this.ae = !1
    };

    function Ub(a, b, c, d) {
      if (c == Nb && b.gc && !b.Uc)
        for (; a && a.fd; a = a.Ba) a.fd = !1;
      if (b.u) b.u.Ba = null, Zb(b, c, d);
      else try {
        b.Uc ? b.Lc.call(b.context) : Zb(b, c, d)
      } catch (e) {
        $b.call(null, e)
      }
      Pb.put(b)
    }

    function Zb(a, b, c) {
      b == Lb ? a.Lc.call(a.context, c) : a.gc && a.gc.call(a.context, c)
    }

    function Yb(a, b) {
      a.fd = !0;
      Cb(function () {
        a.fd && $b.call(null, b)
      })
    }
    var $b = zb;

    function Mb(a) {
      Va.call(this, a)
    }
    la(Mb, Va);
    Mb.prototype.name = "cancel";
    var ac = "undefined" != typeof Promise ? Promise : "undefined" != typeof n.Promise ? n.Promise : Ib;
    n.setTimeout || (n.setTimeout = function () {
      setTimeout.apply(null, arguments)
    });
    Ib.prototype["catch"] = Ib.prototype.Kg;

    function x() {
      var a = this;
      this.reject = this.resolve = null;
      this.m = new ac(function (b, c) {
        a.resolve = b;
        a.reject = c
      })
    }

    function y(a, b) {
      return function (c, d) {
        c ? a.reject(c) : a.resolve(d);
        ga(b) && (bc(a.m), 1 === b.length ? b(c) : b(c, d))
      }
    }

    function bc(a) {
      a.then(void 0, aa)
    };
    var cc = global.eio;

    function dc() {
      this.$e = {
        WxHttp: Da,
        WxImplicit: Oa
      };
      this.Sc = "s-dalwx-nss-1.wilddogio.com"
    }

    function ec(a) {
      var b = [];
      a.forEach(function (a) {
        null != this.$e[a] && b.push(this.$e[a])
      }, fc);
      return b
    }
    dc.prototype.lf = function (a) {
      function b(a, b) {
        if (null == b) return -1;
        for (var c = 0; c < a.length; c++)
          if (a[c][".key"] === b) return c;
        return -1
      }

      function c(a) {
        return {
          ".key": a.key(),
          ".value": a.val(),
          ".priority": a.getPriority()
        }
      }
      a.prototype.bindAsArray = function (a, e, f) {
        function d() {
          var b = {};
          b[e] = k;
          a.setData(b)
        }
        if (null == a) throw Error("please provide page as 1st param");
        if (null == e || "string" != typeof e) throw Error("please provide varible name as 2nd param");
        if (null == a[".bindWilddogFuncs"] || "object" != typeof a[".bindWilddogFuncs"]) a[".bindWilddogFuncs"] = {};
        if (null != a[".bindWilddogFuncs"][e]) throw Error(e + " bind more than once");
        var k = [],
          l = {
            child_added: function (a, e) {
              var f = c(a);
              k.splice(b(k, e) + 1, 0, f);
              d()
            },
            child_removed: function (a) {
              a = a.key();
              k.splice(b(k, a), 1);
              d()
            },
            child_moved: function (a, c) {
              var e = b(k, a.key()),
                e = k.splice(e, 1);
              k.splice(b(k, c) + 1, 0, e[0]);
              d()
            },
            child_changed: function (a) {
              a = c(a);
              k[b(k, a[".key"])] = a;
              d()
            }
          },
          m = ["child_added", "child_removed", "child_moved", "child_changed"],
          L = new x;
        bc(L.m);
        this.once("value", function () {
          f && f(null);
          L.resolve()
        }, function (a) {
          f &&
            f(a);
          L.reject(a)
        });
        for (var A = 0; A < m.length; A++) this.on(m[A], l[m[A]]);
        a[".bindWilddogFuncs"][e] = l;
        return L.m
      };
      a.prototype.bindAsObject = function (a, b, f) {
        if (null == a) throw Error("please provide page as 1st param");
        if (null == b || "string" != typeof b) throw Error("please provide varible name as 2nd param");
        if (null == a[".bindWilddogFuncs"] || "object" != typeof a[".bindWilddogFuncs"]) a[".bindWilddogFuncs"] = {};
        if (null != a[".bindWilddogFuncs"][b]) throw Error(b + " bind more than once");
        var d = null,
          e = {
            value: function (e) {
              d =
                c(e);
              e = {};
              e[b] = d;
              a.setData(e)
            }
          },
          l = new x;
        bc(l.m);
        this.once("value", function () {
          f && f(null);
          l.resolve()
        }, function (a) {
          f && f(a);
          l.reject(a)
        });
        this.on("value", e.value);
        a[".bindWilddogFuncs"][b] = e;
        return l.m
      };
      a.prototype.unbind = function (a, b) {
        if (null == a) throw Error("please provide page as 1st param");
        if (null == b || "string" != typeof b) throw Error("please provide varible name as 2nd param");
        if (null != a[".bindWilddogFuncs"]) {
          var c = a[".bindWilddogFuncs"][b];
          if (null != c && "object" == typeof c) {
            for (var d = ["child_added",
                "child_removed", "child_moved", "child_changed", "value"
              ], e = 0; e < d.length; e++) {
              var l = d[e];
              null != c[l] && "function" == typeof c[l] && this.off(l, c[l])
            }
            delete a[".bindWilddogFuncs"][b]
          }
        }
      }
    };
    var fc = new dc;

    function gc() {
      this.hb = -1
    };

    function hc() {
      this.hb = 64;
      this.U = [];
      this.Wd = [];
      this.Cf = [];
      this.yd = [];
      this.yd[0] = 128;
      for (var a = 1; a < this.hb; ++a) this.yd[a] = 0;
      this.Od = this.$b = 0;
      this.reset()
    }
    la(hc, gc);
    hc.prototype.reset = function () {
      this.U[0] = 1732584193;
      this.U[1] = 4023233417;
      this.U[2] = 2562383102;
      this.U[3] = 271733878;
      this.U[4] = 3285377520;
      this.Od = this.$b = 0
    };

    function ic(a, b, c) {
      c || (c = 0);
      var d = a.Cf;
      if (q(b))
        for (var e = 0; 16 > e; e++) d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(c + 2) << 8 | b.charCodeAt(c + 3), c += 4;
      else
        for (e = 0; 16 > e; e++) d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3], c += 4;
      for (e = 16; 80 > e; e++) {
        var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
        d[e] = (f << 1 | f >>> 31) & 4294967295
      }
      b = a.U[0];
      c = a.U[1];
      for (var g = a.U[2], k = a.U[3], l = a.U[4], m, e = 0; 80 > e; e++) 40 > e ? 20 > e ? (f = k ^ c & (g ^ k), m = 1518500249) : (f = c ^ g ^ k, m = 1859775393) : 60 > e ? (f = c & g | k & (c | g), m = 2400959708) : (f = c ^ g ^ k, m = 3395469782), f = (b <<
        5 | b >>> 27) + f + l + m + d[e] & 4294967295, l = k, k = g, g = (c << 30 | c >>> 2) & 4294967295, c = b, b = f;
      a.U[0] = a.U[0] + b & 4294967295;
      a.U[1] = a.U[1] + c & 4294967295;
      a.U[2] = a.U[2] + g & 4294967295;
      a.U[3] = a.U[3] + k & 4294967295;
      a.U[4] = a.U[4] + l & 4294967295
    }
    hc.prototype.update = function (a, b) {
      if (null != a) {
        p(b) || (b = a.length);
        for (var c = b - this.hb, d = 0, e = this.Wd, f = this.$b; d < b;) {
          if (0 == f)
            for (; d <= c;) ic(this, a, d), d += this.hb;
          if (q(a))
            for (; d < b;) {
              if (e[f] = a.charCodeAt(d), ++f, ++d, f == this.hb) {
                ic(this, e);
                f = 0;
                break
              }
            } else
              for (; d < b;)
                if (e[f] = a[d], ++f, ++d, f == this.hb) {
                  ic(this, e);
                  f = 0;
                  break
                }
        }
        this.$b = f;
        this.Od += b
      }
    };
    hc.prototype.digest = function () {
      var a = [],
        b = 8 * this.Od;
      56 > this.$b ? this.update(this.yd, 56 - this.$b) : this.update(this.yd, this.hb - (this.$b - 56));
      for (var c = this.hb - 1; 56 <= c; c--) this.Wd[c] = b & 255, b /= 256;
      ic(this, this.Wd);
      for (c = b = 0; 5 > c; c++)
        for (var d = 24; 0 <= d; d -= 8) a[b] = this.U[c] >> d & 255, ++b;
      return a
    };
    var jc = null,
      kc = null;

    function lc(a) {
      var b = "";
      mc(a, function (a) {
        b += String.fromCharCode(a)
      });
      return b
    }

    function mc(a, b) {
      function c(b) {
        for (; d < a.length;) {
          var c = a.charAt(d++),
            e = kc[c];
          if (null != e) return e;
          if (!/^[\s\xa0]*$/.test(c)) throw Error("Unknown base64 encoding at char: " + c);
        }
        return b
      }
      nc();
      for (var d = 0;;) {
        var e = c(-1),
          f = c(0),
          g = c(64),
          k = c(64);
        if (64 === k && -1 === e) break;
        b(e << 2 | f >> 4);
        64 != g && (b(f << 4 & 240 | g >> 2), 64 != k && b(g << 6 & 192 | k))
      }
    }

    function nc() {
      if (!jc) {
        jc = {};
        kc = {};
        for (var a = 0; 65 > a; a++) jc[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a), kc[jc[a]] = a, 62 <= a && (kc["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)] = a)
      }
    };
    var oc = function () {
      var a = 1;
      return function () {
        return a++
      }
    }();

    function z(a, b) {
      if (!a) throw pc(b);
    }

    function pc(a) {
      return Error("Wilddog (" + Wilddog.Ee + ") INTERNAL ASSERT FAILED: " + a)
    }

    function qc(a) {
      try {
        return "NODE" == CLIENT_TYPE ? (new Buffer(a, "base64")).toString("utf8") : "undefined" !== typeof atob ? atob(a) : lc(a)
      } catch (b) {
        Ra("base64Decode failed: ", b)
      }
      return null
    }

    function rc(a) {
      for (var b = [], c = 0, d = 0; d < a.length; d++) {
        var e = a.charCodeAt(d);
        55296 <= e && 56319 >= e && (e -= 55296, d++, z(d < a.length, "Surrogate pair missing trail surrogate."), e = 65536 + (e << 10) + (a.charCodeAt(d) - 56320));
        128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (65536 > e ? b[c++] = e >> 12 | 224 : (b[c++] = e >> 18 | 240, b[c++] = e >> 12 & 63 | 128), b[c++] = e >> 6 & 63 | 128), b[c++] = e & 63 | 128)
      }
      a = new hc;
      a.update(b);
      b = a.digest();
      nc();
      a = jc;
      c = [];
      for (d = 0; d < b.length; d += 3) {
        var f = b[d],
          g = (e = d + 1 < b.length) ? b[d + 1] : 0,
          k = d + 2 < b.length,
          l = k ? b[d + 2] : 0,
          m = f >> 2,
          f = (f & 3) <<
          4 | g >> 4,
          g = (g & 15) << 2 | l >> 6,
          l = l & 63;
        k || (l = 64, e || (g = 64));
        c.push(a[m], a[f], a[g], a[l])
      }
      return c.join("")
    }

    function sc(a) {
      for (var b = "", c = 0; c < arguments.length; c++) var d = arguments[c],
        e = da(d),
        b = "array" == e || "object" == e && "number" == typeof d.length ? b + sc.apply(null, arguments[c]) : "object" === typeof arguments[c] ? b + u(arguments[c]) : b + arguments[c],
        b = b + " ";
      return b
    }
    var tc = null,
      uc = !0;

    function Ra(a) {
      !0 === uc && (uc = !1, null === tc && !0 === v.get("logging_enabled") && Wilddog.Me(!0));
      if (tc) {
        var b = sc.apply(null, arguments);
        tc(b)
      }
    }

    function vc(a) {
      return function () {
        Ra(a, arguments)
      }
    }

    function wc(a) {
      if ("undefined" !== typeof console) {
        var b = "WILDDOG INTERNAL ERROR: " + sc.apply(null, arguments);
        "undefined" !== typeof console.error ? console.error(b) : console.log(b)
      }
    }

    function xc(a) {
      var b = sc.apply(null, arguments);
      throw Error("WILDDOG FATAL ERROR: " + b);
    }

    function B(a) {
      if ("undefined" !== typeof console) {
        var b = "WILDDOG WARNING: " + sc.apply(null, arguments);
        "undefined" !== typeof console.warn ? console.warn(b) : console.log(b)
      }
    }

    function La(a) {
      var b = "",
        c = "",
        d = "",
        e = "",
        f = !0,
        g = "https",
        k = 443;
      if (q(a)) {
        var l = a.indexOf("//");
        0 <= l && (g = a.substring(0, l - 1), a = a.substring(l + 2));
        l = a.indexOf("/"); - 1 === l && (l = a.length);
        b = a.substring(0, l);
        e = "";
        a = a.substring(l).split("/");
        for (l = 0; l < a.length; l++)
          if (0 < a[l].length) {
            var m = a[l];
            try {
              m = decodeURIComponent(m.replace(/\+/g, " "))
            } catch (L) {}
            e += "/" + m
          } a = b.split(".");
        3 === a.length ? (c = a[1], d = a[0].toLowerCase()) : 2 === a.length && (c = a[0]);
        l = b.indexOf(":");
        0 <= l && (f = "https" === g || "wss" === g, k = b.substring(l + 1), isFinite(k) &&
          (k = String(k)), k = q(k) ? /^\s*-?0x/i.test(k) ? parseInt(k, 16) : parseInt(k, 10) : NaN)
      }
      return {
        host: b,
        port: k,
        domain: c,
        Jg: d,
        Hb: f,
        scheme: g,
        Db: e
      }
    }

    function yc(a) {
      return fa(a) && (a != a || a == Number.POSITIVE_INFINITY || a == Number.NEGATIVE_INFINITY)
    }

    function zc(a, b) {
      if (a === b) return 0;
      if ("[MIN_NAME]" === a || "[MAX_NAME]" === b) return -1;
      if ("[MIN_NAME]" === b || "[MAX_NAME]" === a) return 1;
      var c = Ac(a),
        d = Ac(b);
      return null !== c ? null !== d ? 0 == c - d ? a.length - b.length : c - d : -1 : null !== d ? 1 : a < b ? -1 : 1
    }

    function Bc(a) {
      if ("object" !== typeof a || null === a) return u(a);
      var b = [],
        c;
      for (c in a) b.push(c);
      b.sort();
      c = "{";
      for (var d = 0; d < b.length; d++) 0 !== d && (c += ","), c += u(b[d]), c += ":", c += Bc(a[b[d]]);
      return c + "}"
    }

    function Cc(a, b) {
      if (ea(a))
        for (var c = 0; c < a.length; ++c) b(c, a[c]);
      else w(a, b)
    }

    function Dc(a) {
      z(!yc(a), "Invalid JSON number");
      var b, c, d, e;
      0 === a ? (d = c = 0, b = -Infinity === 1 / a ? 1 : 0) : (b = 0 > a, a = Math.abs(a), a >= Math.pow(2, -1022) ? (d = Math.min(Math.floor(Math.log(a) / Math.LN2), 1023), c = d + 1023, d = Math.round(a * Math.pow(2, 52 - d) - Math.pow(2, 52))) : (c = 0, d = Math.round(a / Math.pow(2, -1074))));
      e = [];
      for (a = 52; a; --a) e.push(d % 2 ? 1 : 0), d = Math.floor(d / 2);
      for (a = 11; a; --a) e.push(c % 2 ? 1 : 0), c = Math.floor(c / 2);
      e.push(b ? 1 : 0);
      e.reverse();
      b = e.join("");
      c = "";
      for (a = 0; 64 > a; a += 8) d = parseInt(b.substr(a, 8), 2).toString(16), 1 === d.length &&
        (d = "0" + d), c += d;
      return c.toLowerCase()
    }
    var Ec = /^-?\d{1,10}$/;

    function Ac(a) {
      return Ec.test(a) && (a = Number(a), -2147483648 <= a && 2147483647 >= a) ? a : null
    }

    function Fc(a) {
      try {
        a()
      } catch (b) {
        setTimeout(function () {
          B("Exception was thrown by user callback.", b.stack || "");
          throw b;
        }, Math.floor(0))
      }
    }

    function C(a, b) {
      if (ga(a)) {
        var c = Array.prototype.slice.call(arguments, 1).slice();
        Fc(function () {
          a.apply(null, c)
        })
      }
    };

    function Gc(a) {
      z(ea(a) && 0 < a.length, "Requires a non-empty array");
      this.Ef = a;
      this.Ec = {}
    }
    Gc.prototype.Pd = function (a, b) {
      for (var c = this.Ec[a] || [], d = 0; d < c.length; d++) c[d].tc.apply(c[d].context, Array.prototype.slice.call(arguments, 1))
    };
    Gc.prototype.Ab = function (a, b, c) {
      Hc(this, a);
      this.Ec[a] = this.Ec[a] || [];
      this.Ec[a].push({
        tc: b,
        context: c
      });
      (a = this.ge(a)) && b.apply(c, a)
    };
    Gc.prototype.fc = function (a, b, c) {
      Hc(this, a);
      a = this.Ec[a] || [];
      for (var d = 0; d < a.length; d++)
        if (a[d].tc === b && (!c || c === a[d].context)) {
          a.splice(d, 1);
          break
        }
    };

    function Hc(a, b) {
      z(eb(a.Ef, function (a) {
        return a === b
      }), "Unknown event: " + b)
    };

    function D(a, b) {
      Gc.call(this, ["authStateChanged", "authTokenExpired"]);
      this.Df = {
        sf: !1
      };
      this.Fe = {};
      Object.defineProperty(this, "name", {
        value: b,
        writable: !1
      });
      Object.defineProperty(this, "options", {
        value: a,
        writable: !1
      })
    }
    la(D, Gc);

    function Ic(a, b) {
      D.prototype[a] = function () {
        return b(this)
      }
    }
    D.prototype.Qf = function (a, b) {
      var c = !0,
        d;
      for (d in Jc)
        if (Jc.hasOwnProperty(d) && Jc[d] === a) {
          c = !1;
          break
        } if (c) throw Error("Unknown event " + a);
      this.Fe[a] = b;
      switch (a) {
        case Jc.gb:
          this.Df.sf = b && b.sf
      }
      this.Pd(a, b)
    };
    D.prototype.emit = D.prototype.Qf;
    D.prototype.bind = function (a, b) {
      this.Ab(a, b)
    };
    D.prototype.bind = D.prototype.bind;
    D.prototype.Lg = function (a, b) {
      this.fc(a, b)
    };
    D.prototype.unbind = D.prototype.Lg;
    D.prototype.ge = function (a) {
      switch (a) {
        case Jc.gb:
          return [this.Fe[Jc.gb]]
      }
      return null
    };
    var Jc = {
      gb: "authStateChanged",
      Ie: "authTokenExpired"
    };
    D.prototype.qb = Jc;

    function Kc(a, b, c, d, e, f) {
      this.uid = e;
      this.displayName = a;
      this.phone = f;
      this.email = b;
      this.photoURL = c;
      this.providerId = d
    };

    function E(a, b, c, d, e) {
      Kc.call(this, b.displayName, b.email, b.photoURL, b.providerId, b.uid, b.phone);
      this.isAnonymous = "anonymous" === this.dh;
      this.emailVerified = !0 === c;
      this.phoneVerified = !0 === d;
      this.providerData = e || [];
      this.refreshToken = null;
      Object.defineProperty(this, "__authManager", {
        value: a,
        writable: !1
      })
    }
    la(E, Kc);
    ka("wd.User", E);
    E.prototype["delete"] = function (a) {
      var b = new x;
      Lc(this.__authManager, this.Ga(), y(b, a));
      return b.m
    };
    E.prototype["delete"] = E.prototype["delete"];
    E.prototype.Ga = function () {
      return (this.__authManager.Qa || null).idToken
    };
    E.prototype.getToken = E.prototype.Ga;
    E.prototype.he = function () {
      return this.phone
    };
    E.prototype.getPhone = E.prototype.he;
    E.prototype.link = function (a, b) {
      F("wilddog.User.link", 1, 2, arguments.length);
      Mc("wilddog.User.link", a);
      var c = a.provider,
        d = new x,
        e = {};
      e.idToken = this.Ga();
      "password" == c ? (e.email = a.email, e.password = a.password, Nc(this.__authManager, e, y(d, b))) : (e.providerId = a.provider, e.accessToken = a.accessToken, e.openId = a.openId || "", e.authType = "link", Oc(this.__authManager, e, y(d, b)));
      return d.m
    };
    E.prototype.link = E.prototype.link;
    E.prototype.Og = function (a, b) {
      F("wilddog.User.unlink", 1, 2, arguments.length);
      Pc("wilddog.User.unlink", 1, a);
      var c = new x,
        d = this;
      Qc(this.__authManager, "unlink", {
        idToken: this.Ga(),
        deleteProvider: [a]
      }, y(c, function (c, f) {
        f && (d.providerData = d.providerData.filter(function (b) {
          if (b.providerId != a) return b
        }), 0 === d.providerData.length && (Rc(d.__authManager, null), (void 0)(null)));
        b && b(c, f)
      }));
      return c.m
    };
    E.prototype.unlink = E.prototype.Og;
    E.prototype.cg = function (a, b) {
      F("wilddog.auth().signInWithPopup", 1, 2, arguments.length);
      Mc("wilddog.auth().signInWithPopup", a);
      var c = new x;
      Sc(this.__authManager, a, {
        authType: "link",
        idToken: this.Ga()
      }, y(c, b));
      return c.m
    };
    E.prototype.linkWithPopup = E.prototype.cg;
    E.prototype.dg = function (a, b) {
      F("wilddog.auth().signInWithPopup", 1, 2, arguments.length);
      Mc("wilddog.auth().signInWithPopup", a);
      var c = new x;
      Tc(this.__authManager, a, {
        authType: "link",
        idToken: this.Ga()
      }, y(c, b));
      return c.m
    };
    E.prototype.linkWithRedirect = E.prototype.dg;
    E.prototype.Sg = function (a, b) {
      F("wilddog.User.updateProfile", 1, 2, arguments.length);
      Mc("wilddog.User.updateProfile", a);
      var c = new x;
      a.idToken = this.Ga();
      Qc(this.__authManager, "profile", a, y(c, b));
      return c.m
    };
    E.prototype.updateProfile = E.prototype.Sg;
    E.prototype.Pg = function (a, b) {
      F("wilddog.User.updateEmail", 1, 2, arguments.length);
      Pc("wilddog.User.updateEmail", 1, a);
      var c = new x;
      Nc(this.__authManager, {
        email: a,
        idToken: this.Ga()
      }, y(c, b));
      return c.m
    };
    E.prototype.updateEmail = E.prototype.Pg;
    E.prototype.Rg = function (a, b) {
      F("wilddog.User.updatePhone", 1, 2, arguments.length);
      Pc("wilddog.User.updatePhone", 1, a);
      var c = new x;
      Nc(this.__authManager, {
        phoneNumber: a,
        idToken: this.Ga()
      }, y(c, b));
      return c.m
    };
    E.prototype.updatePhone = E.prototype.Rg;
    E.prototype.Ug = function (a, b) {
      F("wilddog.User.verifiyPhone", 1, 2, arguments.length);
      Pc("wilddog.User.verifiyPhone", 1, a);
      var c = new x;
      Uc(this.__authManager, {
        phoneNumber: this.he(),
        smsCode: a
      }, y(c, b));
      return c.m
    };
    E.prototype.verifiyPhone = E.prototype.Ug;
    E.prototype.Qg = function (a, b) {
      F("wilddog.User.updatePassword", 1, 2, arguments.length);
      Pc("wilddog.User.updatePassword", 1, a);
      var c = new x;
      Nc(this.__authManager, {
        password: a,
        idToken: this.Ga()
      }, y(c, b));
      return c.m
    };
    E.prototype.updatePassword = E.prototype.Qg;
    E.prototype.sg = function (a) {
      F("wilddog.User.sendEmailVerification", 0, 1, arguments.length);
      G("wilddog.User.sendEmailVerification", 1, a, !0);
      var b = new x;
      Vc(this.__authManager, {
        idToken: this.Ga(),
        requestType: "VERIFY_EMAIL"
      }, y(b, a));
      return b.m
    };
    E.prototype.sendEmailVerification = E.prototype.sg;
    E.prototype.vg = function (a) {
      F("wilddog.User.sendPhoneVerification", 0, 1, arguments.length);
      G("wilddog.User.sendPhoneVerification", 1, a, !0);
      var b = new x;
      Wc(this.__authManager, {
        phoneNumber: this.he(),
        type: "PHONE_VERIFY"
      }, y(b, a));
      return b.m
    };
    E.prototype.sendPhoneVerification = E.prototype.vg;
    E.prototype.reload = function (a) {
      F("wilddog.User.reload", 0, 1, arguments.length);
      G("wilddog.User.reload", 1, a, !0);
      var b = new x;
      Xc(this.__authManager, this.Ga(), y(b, a));
      return b.m
    };
    E.prototype.reload = E.prototype.reload;
    E.prototype.og = function (a, b) {
      F("wilddog.User.reload", 1, 2, arguments.length);
      G("wilddog.User.reload", 2, b, !0);
      if (!a || !a.provider) throw Error("Unknown credential object.");
      var c = new x;
      Oc(this.__authManager, a, y(c, b));
      return c.m
    };
    E.prototype.reauthenticate = E.prototype.og;

    function Yc(a) {
      var b = "POST";
      switch (a.providerId || a.provider) {
        case "password":
          a = "verifyPassword";
          break;
        case "anonymous":
          a = "verifyAnonymous";
          break;
        case "custom":
          a = "verifyCustomToken";
          break;
        default:
          a = "credential", b = "GET"
      }
      if (!a) throw Error("Unknown provider '" + provider + "'.");
      return {
        path: a,
        method: b
      }
    };

    function Zc(a) {
      if (a && a.users && a.users[0]) return a = a.users[0], new Kc(a.displayName, a.email, a.photoUrl, a.providerId, a.localId, a.phoneNumber);
      throw Error("Bad response format.");
    }

    function $c(a, b) {
      var c = Zc(b);
      if (!c) return null;
      var d = b.users[0],
        e = d.providerUserInfo.map(function (a) {
          a.photoURL = a.photoUrl;
          delete a.photoUrl;
          return a
        });
      return new E(a, c, d.emailVerified, d.phoneNumberVerified, e)
    };

    function ad(a) {
      var b = {},
        c = {},
        d = {},
        e = "";
      try {
        var f = a.split("."),
          g = qc(f[0]) || "",
          k = qc(f[1]) || "",
          b = Ca(g),
          c = Ca(k),
          e = f[2],
          d = c.d || {};
        delete c.d
      } catch (l) {
        console.warn("error", l)
      }
      return {
        ah: b,
        Yd: c,
        data: d,
        eh: e
      }
    }

    function bd(a) {
      a = ad(a).Yd;
      return "object" === typeof a && a.hasOwnProperty("iat") ? t(a, "iat") : null
    };

    function cd(a, b, c) {
      this.te = ["session", b.zd, b.qc, a].join(":");
      this.Md = c
    }
    cd.prototype.set = function (a, b) {
      if (!b)
        if (this.Md.length) b = this.Md[0];
        else throw Error("wd.auth.SessionManager : No storage options available!");
      b.set(this.te, a)
    };
    cd.prototype.get = function () {
      var a = bb(this.Md, r(this.Yf, this)),
        a = ab(a, function (a) {
          return null !== a
        });
      hb(a, function (a, c) {
        return bd(c.idToken) - bd(a.idToken)
      });
      return 0 < a.length ? a.shift() : null
    };
    cd.prototype.Yf = function (a) {
      try {
        var b = a.get(this.te);
        if (b.idToken) return b;
        this.clear(a)
      } catch (c) {}
      return null
    };
    cd.prototype.clear = function () {
      var a = this;
      ta(this.Md, function (b) {
        b.remove(a.te)
      })
    };

    function dd(a, b, c) {
      this.Zc = a || {};
      this.Tc = b || {};
      this.Y = c || {};
      this.Zc.remember || (this.Zc.remember = "default")
    }
    var ed = ["remember", "redirectTo"];

    function fd(a) {
      var b = {},
        c = {};
      qa(a || {}, function (a, e) {
        0 <= $a(ed, a) ? b[a] = e : c[a] = e
      });
      return new dd(b, {}, c)
    };

    function gd(a, b, c) {
      this.Nb = a;
      this.la = a.app;
      this.Mb = b;
      this.lc = new cd(this.la.name, b, [Ua, v]);
      this.Qa = null;
      this.Bb = c;
      hd(this)
    }

    function hd(a) {
      v.get("redirect_request_id") && jd(a);
      var b = a.lc.get();
      b && b.idToken ? Xc(a, b.idToken, function (c, d) {
        if (!c && d) {
          var e = {
            signIn: !0
          };
          e.currentUser = d;
          e.idToken = b.idToken;
          Rc(a, e);
          kd(a, e, {})
        } else Rc(a, null)
      }) : Rc(a, null)
    }

    function ld(a, b, c, d) {
      b && b.idToken ? md(a, b.idToken, c, function (a, b) {
        d(a, b)
      }) : (Rc(a, null), d(Error("No idToken found in response.")))
    }

    function md(a, b, c, d) {
      Xc(a, b, function (e, f) {
        if (!e && f) {
          var g = {
            signIn: !0
          };
          g.currentUser = f;
          g.idToken = b;
          Rc(a, g);
          kd(a, g, c);
          d(null, f)
        } else Rc(a, null), d(e)
      })
    }

    function Oc(a, b, c) {
      nd(a);
      var d = new dd({}, {}, b || {});
      b = Yc(b);
      d.Y._method = b.method;
      var e = ec(["XHR", "JSONP", "NodeHttp", "WxHttp"]);
      od(a, e, "/auth/" + b.path, d, function (a, b) {
        C(c, a, b)
      })
    }

    function pd(a, b) {
      nd(a);
      var c = new dd({}, {}, {}),
        d = ec(["WxImplicit"]);
      od(a, d, "/auth/wxapp", c, function (a, c) {
        C(b, a, c)
      })
    }

    function Sc(a, b, c, d) {
      nd(a);
      var e = ec(["Popup", "Cordova"]);
      requestInfo = fd(c);
      height = width = 625;
      b.id ? (requestInfo.Y.providerId = b.id, requestInfo.Y.scope = b.scope || "", requestInfo.Y.appId = a.Mb.qc, requestInfo.Tc.window_features = "menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=" + height + ",width=" + width + ",top=" + ("object" === typeof screen ? .5 * (screen.height - height) : 0) + ",left=" + ("object" === typeof screen ? .5 * (screen.width - width) : 0), requestInfo.Tc.relay_url = Ma(a.Mb.qc),
        requestInfo.Tc.requestWithCredential = r(a.Xa, a), od(a, e, "/auth/oauth", requestInfo, function (a, b) {
          C(d, a, b)
        })) : setTimeout(function () {
        C(d, oa("TRANSPORT_UNAVAILABLE_FOR_UNKNOWN_PROVIDER"))
      }, 0)
    }

    function Tc(a, b, c, d) {
      nd(a);
      var e = ec(["Redirect"]);
      c = fd(c);
      b.id ? (c.Y.providerId = b.id, c.Y.scope = b.scope || "", c.Y.appId = a.Mb.qc, v.set("redirect_client_options", c.Zc), od(a, e, "/auth/oauth", c, function (a, b) {
        C(d, a, b)
      })) : C(d, oa("TRANSPORT_UNAVAILABLE"))
    }

    function jd(a) {
      var b = v.get("redirect_request_id");
      if (b) {
        var c = v.get("redirect_client_options"),
          d = ec(["XHR", "JSONP"]);
        serverParams = {
          requestId: b,
          requestKey: Ja()
        };
        transportOptions = {};
        requestInfo = new dd(c, transportOptions, serverParams);
        try {
          document.location.hash = document.location.hash.replace(/&__wilddog_request_key=([a-zA-z0-9]*)/, "")
        } catch (e) {}
        od(a, d, "/auth/session", requestInfo, function () {
          v.remove("redirect_request_id");
          v.remove("redirect_client_options")
        }.bind(a))
      }
    }

    function qd(a, b, c) {
      nd(a);
      b = fd(b);
      b.Y._method = "POST";
      a.Xa("/auth/signupNewUser", b, function (b, e) {
        !b && e && e.idToken ? md(a, e.idToken, null, function (a, b) {
          C(c, a, b)
        }) : C(c, b)
      })
    }

    function Qc(a, b, c, d) {
      var e = {
          idToken: c.idToken
        },
        f = c.photoURL || a.Qa.currentUser.photoURL,
        g = c.displayName || a.Qa.currentUser.displayName;
      switch (b) {
        case "unlink":
          e.deleteProvider = c.deleteProvider;
          break;
        case "profile":
          e.photoUrl = f, e.displayName = g
      }
      rd(a, e, function (b, c) {
        b ? C(d, b) : (a.Qa.currentUser.displayName = g, a.Qa.currentUser.photoURL = f, kd(a, a.Qa), C(d, b, c))
      })
    }

    function Nc(a, b, c) {
      rd(a, b, function (b, e) {
        b ? C(c, b) : ld(a, e, {}, c)
      })
    }

    function rd(a, b, c) {
      b = fd(b);
      b.Y._method = "POST";
      b.Y.idToken = a.Qa.idToken;
      a.Xa("/auth/setAccountInfo", b, function (a, b) {
        a ? c(a) : c(a, b)
      })
    }

    function Xc(a, b, c) {
      nd(a);
      b = fd({
        idToken: b
      });
      b.Y._method = "POST";
      a.Xa("/auth/getAccountInfo", b, function (b, e) {
        b ? c(b) : c(b, $c(a, e))
      })
    }

    function Lc(a, b, c) {
      nd(a);
      b = fd({
        idToken: b
      });
      b.Y._method = "POST";
      a.Xa("/auth/deleteAccount", b, function (b, e) {
        !b && e && "ok" == e.status && a.Qa && (Rc(a, null), (void 0)(null));
        C(c, b)
      })
    }

    function Vc(a, b, c) {
      nd(a);
      b = fd(b);
      b.Y._method = "POST";
      a.Xa("/auth/getOobConfirmationCode", b, function (a, b) {
        C(c, a, b)
      })
    }
    gd.prototype.be = function (a, b) {
      nd(this);
      var c = fd({
        email: a
      });
      c.Y._method = "POST";
      this.Xa("/auth/getProvider", c, function (a, c) {
        a ? C(b, a) : C(b, a, c.allProviders || [])
      })
    };
    gd.prototype.Xa = function (a, b, c) {
      var d = ec(["XHR", "JSONP", "NodeHttp", "WxHttp"]);
      sd(this, d, a, b, c)
    };

    function od(a, b, c, d, e) {
      sd(a, b, c, d, function (b, c) {
        !b && c && c.idToken ? ld(a, c, d.Zc, function (a, b) {
          a ? e(a) : e(null, b)
        }) : e(b || oa("UNKNOWN_ERROR"))
      })
    }

    function sd(a, b, c, d, e) {
      b = ab(b, function (a) {
        return "function" === typeof a.isAvailable && a.isAvailable()
      });
      0 === b.length ? setTimeout(function () {
        e(oa("TRANSPORT_UNAVAILABLE"))
      }, 0) : (b = b.shift(), d.Tc.method = d.Y._method, b = new b(d.Tc), d = ra(d.Y), d.v = CLIENT_TYPE + CLIENT_VERSION, d.transport = "json", d.suppress_status_codes = !0, a = Ka() + "/" + a.Mb.qc + c, b.open(a, d, function (a, b) {
        if (a) e(a);
        else if (b && b.error) {
          var c = Error(b.message);
          c.code = b.errcode;
          e(c)
        } else e(null, b)
      }))
    }

    function kd(a, b, c) {
      a.lc.clear();
      c = c || {};
      var d = Ua;
      "sessionOnly" === c.remember && (d = v);
      "none" !== c.remember && a.lc.set(b, d)
    }

    function Rc(a, b) {
      a.Qa = b;
      a.Nb.currentUser = b && b.signIn ? b.currentUser : null;
      a.Bb && a.Bb(null !== b);
      b && b.signIn || a.lc.clear();
      a.la.emit(a.la.qb.gb, b || {
        signIn: !1
      })
    }

    function nd(a) {
      if (a.Mb.Xe && "auth.wilddog.com" === Fa) throw Error("This custom Wilddog server ('" + a.Mb.domain + "') does not support delegated login.");
    }

    function Uc(a, b, c) {
      b = fd(b);
      b.Y._method = "POST";
      a.Xa("/auth/verifyPhone", b, function (b, e) {
        !b && e && "ok" == e.status && a.Nb.currentUser && (a.Nb.currentUser.phoneVerified = !0);
        !b && e && e.idToken ? md(a, e.idToken, null, function (a) {
          C(c, a)
        }) : C(c, b)
      })
    }

    function td(a, b, c) {
      nd(a);
      b = fd(b);
      b.Y._method = "POST";
      a.Xa("/auth/resetPhonePassword", b, function (a, b) {
        a ? C(c, a) : C(c, a, b)
      })
    }

    function Wc(a, b, c) {
      nd(a);
      b = fd(b);
      b.Y._method = "POST";
      a.Xa("/auth/sendSmsCode", b, function (a, b) {
        C(c, a, b)
      })
    };

    function F(a, b, c, d) {
      var e;
      d < b ? e = "at least " + b : d > c && (e = 0 === c ? "none" : "no more than " + c);
      if (e) throw Error(a + " failed: Was called with " + d + (1 === d ? " argument." : " arguments.") + " Expects " + e + ".");
    }

    function ud(a, b, c) {
      switch (b) {
        case 1:
          b = c ? "first" : "First";
          break;
        case 2:
          b = c ? "second" : "Second";
          break;
        case 3:
          b = c ? "third" : "Third";
          break;
        case 4:
          b = c ? "fourth" : "Fourth";
          break;
        default:
          throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");
      }
      return a + " failed: " + (b + " argument ")
    }

    function G(a, b, c, d) {
      if ((!d || p(c)) && !ga(c)) throw Error(ud(a, b, d) + "must be a valid function.");
    }

    function vd(a, b, c) {
      if (p(c) && (!ha(c) || null === c)) throw Error(ud(a, b, !0) + "must be a valid context object.");
    };

    function H(a, b) {
      if (1 == arguments.length) {
        this.A = a.split("/");
        for (var c = 0, d = 0; d < this.A.length; d++) 0 < this.A[d].length && (this.A[c] = this.A[d], c++);
        this.A.length = c;
        this.ba = 0
      } else this.A = a, this.ba = b
    }

    function I(a, b) {
      var c = J(a);
      if (null === c) return b;
      if (c === J(b)) return I(K(a), K(b));
      throw Error("INTERNAL ERROR: innerPath (" + b + ") is not within outerPath (" + a + ")");
    }

    function J(a) {
      return a.ba >= a.A.length ? null : a.A[a.ba]
    }

    function xd(a) {
      return a.A.length - a.ba
    }

    function K(a) {
      var b = a.ba;
      b < a.A.length && b++;
      return new H(a.A, b)
    }

    function yd(a) {
      return a.ba < a.A.length ? a.A[a.A.length - 1] : null
    }
    h = H.prototype;
    h.toString = function () {
      for (var a = "", b = this.ba; b < this.A.length; b++) "" !== this.A[b] && (a += "/" + this.A[b]);
      return a || "/"
    };
    h.slice = function (a) {
      return this.A.slice(this.ba + (a || 0))
    };
    h.parent = function () {
      if (this.ba >= this.A.length) return null;
      for (var a = [], b = this.ba; b < this.A.length - 1; b++) a.push(this.A[b]);
      return new H(a, 0)
    };
    h.u = function (a) {
      for (var b = [], c = this.ba; c < this.A.length; c++) b.push(this.A[c]);
      if (a instanceof H)
        for (c = a.ba; c < a.A.length; c++) b.push(a.A[c]);
      else
        for (a = a.split("/"), c = 0; c < a.length; c++) 0 < a[c].length && b.push(a[c]);
      return new H(b, 0)
    };
    h.f = function () {
      return this.ba >= this.A.length
    };
    h.da = function (a) {
      if (xd(this) !== xd(a)) return !1;
      for (var b = this.ba, c = a.ba; b <= this.A.length; b++, c++)
        if (this.A[b] !== a.A[c]) return !1;
      return !0
    };
    h.contains = function (a) {
      var b = this.ba,
        c = a.ba;
      if (xd(this) > xd(a)) return !1;
      for (; b < this.A.length;) {
        if (this.A[b] !== a.A[c]) return !1;
        ++b;
        ++c
      }
      return !0
    };
    var M = new H("");

    function zd(a, b) {
      this.Ua = a.slice();
      this.Ia = Math.max(1, this.Ua.length);
      this.Oe = b;
      for (var c = 0; c < this.Ua.length; c++) this.Ia += Ad(this.Ua[c]);
      Bd(this)
    }
    zd.prototype.push = function (a) {
      0 < this.Ua.length && (this.Ia += 1);
      this.Ua.push(a);
      this.Ia += Ad(a);
      Bd(this)
    };
    zd.prototype.pop = function () {
      var a = this.Ua.pop();
      this.Ia -= Ad(a);
      0 < this.Ua.length && --this.Ia
    };

    function Bd(a) {
      if (768 < a.Ia) throw Error(a.Oe + "has a key path longer than 768 bytes (" + a.Ia + ").");
      if (32 < a.Ua.length) throw Error(a.Oe + "path specified exceeds the maximum depth that can be written (32) or object contains a cycle " + Cd(a));
    }

    function Cd(a) {
      return 0 == a.Ua.length ? "" : "in property '" + a.Ua.join(".") + "'"
    };

    function Ad(a) {
      for (var b = 0, c = 0; c < a.length; c++) {
        var d = a.charCodeAt(c);
        128 > d ? b++ : 2048 > d ? b += 2 : 55296 <= d && 56319 >= d ? (b += 4, c++) : b += 3
      }
      return b
    };
    var Dd = /[\[\].#$\/\u0000-\u001F\u007F]/,
      Ed = /[\[\].#$\u0000-\u001F\u007F]/;

    function Fd(a) {
      return q(a) && 0 !== a.length && !Dd.test(a)
    }

    function Gd(a) {
      return null === a || q(a) || fa(a) && !yc(a) || ha(a) && pa(a, ".sv")
    }

    function Hd(a, b, c, d) {
      d && !p(b) || Id(ud(a, 1, d), b, c)
    }

    function Id(a, b, c) {
      c instanceof H && (c = new zd(c, a));
      if (!p(b)) throw Error(a + "contains undefined " + Cd(c));
      if (ga(b)) throw Error(a + "contains a function " + Cd(c) + " with contents: " + b.toString());
      if (yc(b)) throw Error(a + "contains " + b.toString() + " " + Cd(c));
      if (q(b) && b.length > 10485760 / 3 && 10485760 < Ad(b)) throw Error(a + "contains a string greater than 10485760 utf8 bytes " + Cd(c) + " ('" + b.substring(0, 50) + "...')");
      if (ha(b)) {
        var d = !1,
          e = !1;
        qa(b, function (b, g) {
          if (".value" === b) d = !0;
          else if (".priority" !== b && ".sv" !== b && (e = !0, !Fd(b))) throw Error(a + " contains an invalid key (" + b + ") " + Cd(c) + '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
          c.push(b);
          Id(a, g, c);
          c.pop()
        });
        if (d && e) throw Error(a + ' contains ".value" child ' + Cd(c) + " in addition to actual children.");
      }
    }

    function Jd(a, b) {
      var c, d;
      for (c = 0; c < b.length; c++) {
        d = b[c];
        for (var e = d.slice(), f = 0; f < e.length; f++)
          if ((".priority" !== e[f] || f !== e.length - 1) && !Fd(e[f])) throw Error(a + "contains an invalid key (" + e[f] + ") in path " + d.toString() + '. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
      }
      b.sort(H.Yg);
      e = null;
      for (c = 0; c < b.length; c++) {
        d = b[c];
        if (null !== e && e.contains(d)) throw Error(a + "contains a path " + e.toString() + " that is ancestor of another path " + d.toString());
        e = d
      }
    }

    function Kd(a, b, c) {
      var d = ud(a, 1, !1);
      if (!ha(b) || ea(b)) throw Error(d + " must be an Object containing the children to replace.");
      if (pa(b, ".value")) throw Error(d + ' must not contain ".value".  To overwrite with a leaf value, just use .set() instead.');
      var e = [];
      qa(b, function (a, b) {
        var f = new H(a);
        Id(d, b, c.u(f));
        if (".priority" === yd(f) && !Gd(b)) throw Error(d + "contains an invalid value for '" + f.toString() + "', which must be a valid Firebase priority (a string, finite number, server value, or null).");
        e.push(f)
      });
      Jd(d, e)
    }

    function Ld(a, b, c) {
      if (yc(c)) throw Error(ud(a, b, !1) + "is " + c.toString() + ", but must be a valid Wilddog priority (a string, finite number, server value, or null).");
      if (!Gd(c)) throw Error(ud(a, b, !1) + "must be a valid Wilddog priority (a string, finite number, server value, or null).");
    }

    function Md(a, b, c) {
      if (!c || p(b)) switch (b) {
        case "value":
        case "child_added":
        case "child_removed":
        case "child_changed":
        case "child_moved":
          break;
        default:
          throw Error(ud(a, 1, c) + 'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');
      }
    }

    function Nd(a, b, c, d) {
      if ((!d || p(c)) && !Fd(c)) throw Error(ud(a, b, d) + 'was an invalid key: "' + c + '".  Wilddog keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');
    }

    function Od(a, b) {
      if (!q(b) || 0 === b.length || Ed.test(b)) throw Error(ud(a, 1, !1) + 'was an invalid path: "' + b + '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');
    }

    function Pd(a, b) {
      b && (b = b.replace(/^\/*\.info(\/|$)/, "/"));
      Od(a, b)
    }

    function Qd(a, b) {
      if (".info" === J(b)) throw Error(a + " failed: Can't modify data under /.info/");
    }

    function Pc(a, b, c) {
      if (!q(c)) throw Error(ud(a, b, !1) + "must be a valid string.");
    }

    function Mc(a, b) {
      if (!ha(b) || null === b) throw Error(ud(a, 1, !1) + "must be a valid object.");
    };

    function N(a) {
      if (!a.options.authDomain) throw Error("Could not find 'authDomain' in options.");
      var b = this;
      this.Ff = function (a) {
        var b = /^([a-zA-Z0-9\-_]+)\.([a-z]+)\.com/.exec(a.toLowerCase());
        if (!b) throw Error("Bad 'authDomain' format '" + a + "'.");
        return {
          qc: b[1],
          gh: b[2],
          Wg: b[0],
          zd: "",
          Xe: "wilddog" !== b[2]
        }
      }(a.options.authDomain);
      this.app = a;
      this.ca = new gd(this, this.Ff);
      this.app.bind(this.app.qb.Ie, function (a) {
        var c = b.ca;
        a = a.reason;
        c.Qa = null;
        c.Nb.currentUser = null;
        c.la.emit(c.la.qb.gb, {
          signIn: !1,
          reason: a
        });
        c.Bb && c.Bb(!1);
        c.lc.clear()
      })
    }
    N.prototype.fg = function (a) {
      function b(b) {
        var d;
        if (!(d = b && b.signIn)) {
          var f = c.ca;
          d = v.get("redirect_request_id");
          f = f.lc.get();
          d = !(d || f && f.idToken)
        }
        d && a(b && b.signIn ? b.currentUser : null)
      }
      var c = this;
      F("wilddog.auth().onAuthStateChanged", 1, 1, arguments.length);
      G("wilddog.auth().onAuthStateChanged", 1, a, !1);
      this.app.bind(this.app.qb.gb, b);
      return function () {
        c.app.unbind(c.app.qb.gb, b)
      }
    };
    N.prototype.onAuthStateChanged = N.prototype.fg;
    N.prototype.zg = function (a) {
      F("wilddog.auth().signInAnonymously", 0, 1, arguments.length);
      G("wilddog.auth().signInAnonymously", 1, a, !0);
      var b = new x;
      qd(this.ca, {}, y(b, a));
      return b.m
    };
    N.prototype.signInAnonymously = N.prototype.zg;
    N.prototype.Ag = function (a) {
      F("wilddog.auth().signInAnonymously", 0, 1, arguments.length);
      G("wilddog.auth().signInAnonymously", 1, a, !0);
      var b = new x;
      pd(this.ca, y(b, a));
      return b.m
    };
    N.prototype.signInWeapp = N.prototype.Ag;
    N.prototype.tg = function (a, b) {
      F("wilddog.auth().sendPasswordResetEmail", 1, 2, arguments.length);
      G("wilddog.auth().sendPasswordResetEmail", 2, b, !0);
      var c = new x;
      Vc(this.ca, {
        requestType: "RESET_PASSWORD",
        email: a
      }, y(c, b));
      return c.m
    };
    N.prototype.sendPasswordResetEmail = N.prototype.tg;
    N.prototype.ug = function (a, b) {
      F("wilddog.auth().sendPasswordResetSms", 1, 2, arguments.length);
      G("wilddog.auth().sendPasswordResetSms", 2, b, !0);
      var c = new x;
      Wc(this.ca, {
        type: "PASSWORD_RESET",
        phoneNumber: a
      }, y(c, b));
      return c.m
    };
    N.prototype.sendPasswordResetSms = N.prototype.ug;
    N.prototype.Lf = function (a, b, c, d) {
      F("wilddog.auth().sendPasswordResetSms", 3, 4, arguments.length);
      G("wilddog.auth().sendPasswordResetSms", 4, d, !0);
      Pc("wilddog.auth().sendPasswordResetSms", 2, b);
      var e = new x;
      td(this.ca, {
        phoneNumber: a,
        password: c,
        smsCode: b
      }, y(e, d));
      return e.m
    };
    N.prototype.confirmPasswordResetSms = N.prototype.Lf;
    N.prototype.be = function (a, b) {
      F("wilddog.auth().fetchProvidersForEmail", 1, 2, arguments.length);
      G("wilddog.auth().fetchProvidersForEmail", 2, b, !0);
      var c = new x;
      this.ca.be(a, y(c, b));
      return c.m
    };
    N.prototype.fetchProvidersForEmail = N.prototype.be;
    N.prototype.Cg = function (a, b) {
      F("wilddog.auth().signInWithCustomToken", 1, 2, arguments.length);
      G("wilddog.auth().signInWithCustomToken", 2, b, !0);
      var c = new x;
      Oc(this.ca, {
        providerId: "custom",
        token: a
      }, y(c, b));
      return c.m
    };
    N.prototype.signInWithCustomToken = N.prototype.Cg;
    N.prototype.Dg = function (a, b, c) {
      F("wilddog.auth().signInWithEmailAndPassword", 2, 3, arguments.length);
      G("wilddog.auth().signInWithEmailAndPassword", 3, c, !0);
      var d = new x;
      Oc(this.ca, {
        providerId: "password",
        password: b,
        email: a
      }, y(d, c));
      return d.m
    };
    N.prototype.signInWithEmailAndPassword = N.prototype.Dg;
    N.prototype.Eg = function (a, b, c) {
      F("wilddog.auth().signInWithPhoneAndPassword", 2, 3, arguments.length);
      G("wilddog.auth().signInWithPhoneAndPassword", 3, c, !0);
      var d = new x;
      Oc(this.ca, {
        providerId: "password",
        password: b,
        phoneNumber: a
      }, y(d, c));
      return d.m
    };
    N.prototype.signInWithPhoneAndPassword = N.prototype.Eg;
    N.prototype.Hg = function (a) {
      F("wilddog.auth().signOut", 0, 1, arguments.length);
      G("wilddog.auth().signOut", 1, a, !0);
      var b = new x,
        c = y(b, a);
      Rc(this.ca, null);
      c(null);
      return b.m
    };
    N.prototype.signOut = N.prototype.Hg;
    N.prototype.Mf = function (a, b, c) {
      F("wilddog.auth().createUserWithEmailAndPassword", 2, 3, arguments.length);
      G("wilddog.auth().createUserWithEmailAndPassword", 3, c, !0);
      var d = new x;
      qd(this.ca, {
        email: a,
        password: b
      }, y(d, c));
      return d.m
    };
    N.prototype.createUserWithEmailAndPassword = N.prototype.Mf;
    N.prototype.Nf = function (a, b, c) {
      F("wilddog.auth().createUserWithPhoneAndPassword", 2, 3, arguments.length);
      G("wilddog.auth().createUserWithPhoneAndPassword", 3, c, !0);
      var d = new x;
      qd(this.ca, {
        phoneNumber: a,
        password: b
      }, y(d, c));
      return d.m
    };
    N.prototype.createUserWithPhoneAndPassword = N.prototype.Nf;
    N.prototype.Fg = function (a, b) {
      F("wilddog.auth().signInWithPopup", 1, 2, arguments.length);
      Mc("wilddog.auth().signInWithPopup", a);
      var c = new x;
      Sc(this.ca, a, {
        authType: "login"
      }, y(c, b));
      return c.m
    };
    N.prototype.signInWithPopup = N.prototype.Fg;
    N.prototype.Gg = function (a, b) {
      F("wilddog.auth().signInWithRedirect", 1, 2, arguments.length);
      Mc("wilddog.auth().signInWithRedirect", a);
      var c = new x;
      Tc(this.ca, a, {
        authType: "login"
      }, y(c, b));
      return c.m
    };
    N.prototype.signInWithRedirect = N.prototype.Gg;
    N.prototype.Bg = function (a, b) {
      F("wilddog.auth().signInWithCredential", 1, 2, arguments.length);
      Mc("wilddog.auth().signInWithCredential", a);
      var c = {};
      "password" == a.provider ? (c.providerId = a.provider, c.email = a.email, c.phoneNumber = a.phone, c.password = a.password) : (c.providerId = a.provider, c.accessToken = a.accessToken, c.openId = a.openId || a.email);
      c.authType = "login";
      var d = new x;
      Oc(this.ca, c, y(d, b));
      return d.m
    };
    N.prototype.signInWithCredential = N.prototype.Bg;

    function Rd() {
      this.Le = "DEFAULT";
      this.eg = {};
      this.Vc = {};
      this.Vd = this.app = null
    }
    Rd.prototype.ag = function (a, b) {
      var c = b || this.Le;
      this.Vc[c] = new D(a, c);
      b == this.Le || null == b ? this.app = this.Vc[c] : this[c] = this.Vc[c];
      return this.Vc[c]
    };
    Rd.prototype.initializeApp = Rd.prototype.ag;
    Rd.prototype.ue = function (a, b) {
      this.eg[a] = b;
      Ic(a, b);
      this[a] = function () {
        if (this.app) return this.app[a]();
        throw Error("Default application not initialized!Please call wilddog.initializeApp first.");
      }
    };
    Rd.prototype.regService = Rd.prototype.ue;
    Rd.prototype.Ee = CLIENT_VERSION;
    Rd.prototype.SDK_VERSION = Rd.prototype.Ee;
    var Sd = new Rd;

    function Td(a, b) {
      return zc(a.name, b.name)
    }

    function Ud(a, b) {
      return zc(a, b)
    };

    function Vd() {}
    var Wd = {};

    function Xd(a) {
      return r(a.compare, a)
    }
    Vd.prototype.ld = function (a, b) {
      return 0 !== this.compare(new O("[MIN_NAME]", a), new O("[MIN_NAME]", b))
    };

    function Yd(a) {
      this.bc = a
    }
    la(Yd, Vd);
    h = Yd.prototype;
    h.zc = function (a) {
      return !a.P(this.bc).f()
    };
    h.compare = function (a, b) {
      var c = a.node.P(this.bc),
        d = b.node.P(this.bc),
        c = c.uc(d);
      return 0 === c ? zc(a.name, b.name) : c
    };
    h.Fc = function (a, b) {
      var c = P(a),
        c = Q.T(this.bc, c);
      return new O(b, c)
    };
    h.Gc = function () {
      var a = Q.T(this.bc, Zd);
      return new O("[MAX_NAME]", a)
    };
    h.toString = function () {
      return this.bc
    };

    function $d() {}
    la($d, Vd);
    h = $d.prototype;
    h.compare = function (a, b) {
      var c = a.node.G(),
        d = b.node.G(),
        c = c.uc(d);
      return 0 === c ? zc(a.name, b.name) : c
    };
    h.zc = function (a) {
      return !a.G().f()
    };
    h.ld = function (a, b) {
      return !a.G().da(b.G())
    };
    h.Gc = function () {
      return new O("[MAX_NAME]", new ae("[PRIORITY-POST]", Zd))
    };
    h.Fc = function (a, b) {
      var c = P(a);
      return new O(b, new ae("[PRIORITY-POST]", c))
    };
    h.toString = function () {
      return ".priority"
    };
    var R = new $d;

    function be() {}
    la(be, Vd);
    h = be.prototype;
    h.compare = function (a, b) {
      return zc(a.name, b.name)
    };
    h.zc = function () {
      throw pc("KeyIndex.isDefinedOn not expected to be called.");
    };
    h.ld = function () {
      return !1
    };
    h.Gc = function () {
      return new O("[MAX_NAME]", Q)
    };
    h.Fc = function (a) {
      z(q(a), "KeyIndex indexValue must always be a string.");
      return new O(a, Q)
    };
    h.toString = function () {
      return ".key"
    };
    var ce = new be;

    function de() {}
    la(de, Vd);
    h = de.prototype;
    h.compare = function (a, b) {
      var c = a.node.uc(b.node);
      return 0 === c ? zc(a.name, b.name) : c
    };
    h.zc = function () {
      return !0
    };
    h.ld = function (a, b) {
      return !a.da(b)
    };
    h.Gc = function () {
      return ee
    };
    h.Fc = function (a, b) {
      var c = P(a);
      return new O(b, c)
    };
    h.toString = function () {
      return ".value"
    };
    var fe = new de;

    function ge(a, b) {
      this.md = a;
      this.cc = b
    }
    ge.prototype.get = function (a) {
      var b = t(this.md, a);
      if (!b) throw Error("No index defined for " + a);
      return b === Wd ? null : b
    };

    function he(a, b, c) {
      var d = mb(a.md, function (d, f) {
        var e = t(a.cc, f);
        z(e, "Missing index implementation for " + f);
        if (d === Wd) {
          if (e.zc(b.node)) {
            for (var k = [], l = c.Wb(ie), m = S(l); m;) m.name != b.name && k.push(m), m = S(l);
            k.push(b);
            return je(k, Xd(e))
          }
          return Wd
        }
        e = c.get(b.name);
        k = d;
        e && (k = k.remove(new O(b.name, e)));
        return k.Sa(b, b.node)
      });
      return new ge(d, a.cc)
    }

    function ke(a, b, c) {
      var d = mb(a.md, function (a) {
        if (a === Wd) return a;
        var d = c.get(b.name);
        return d ? a.remove(new O(b.name, d)) : a
      });
      return new ge(d, a.cc)
    }
    var le = new ge({
      ".priority": Wd
    }, {
      ".priority": R
    });

    function O(a, b) {
      this.name = a;
      this.node = b
    }

    function ie(a, b) {
      return new O(a, b)
    };

    function ae(a, b) {
      this.I = a;
      z(p(this.I) && null !== this.I, "LeafNode shouldn't be created with null/undefined value.");
      this.fa = b || Q;
      me(this.fa);
      this.yb = null
    }
    h = ae.prototype;
    h.R = function () {
      return !0
    };
    h.G = function () {
      return this.fa
    };
    h.ga = function (a) {
      return new ae(this.I, a)
    };
    h.P = function (a) {
      return ".priority" === a ? this.fa : Q
    };
    h.sa = function (a) {
      return a.f() ? this : ".priority" === J(a) ? this.fa : Q
    };
    h.Ma = function () {
      return !1
    };
    h.Te = function () {
      return null
    };
    h.T = function (a, b) {
      return ".priority" === a ? this.ga(b) : b.f() && ".priority" !== a ? this : Q.T(a, b).ga(this.fa)
    };
    h.K = function (a, b) {
      var c = J(a);
      if (null === c) return b;
      if (b.f() && ".priority" !== c) return this;
      z(".priority" !== c || 1 === xd(a), ".priority must be the last token in a path");
      return this.T(c, Q.K(K(a), b))
    };
    h.f = function () {
      return !1
    };
    h.zb = function () {
      return 0
    };
    h.O = function (a) {
      return a && !this.G().f() ? {
        ".value": this.Ha(),
        ".priority": this.G().O()
      } : this.Ha()
    };
    h.hash = function () {
      if (null === this.yb) {
        var a = "";
        this.fa.f() || (a += "priority:" + ne(this.fa.O()) + ":");
        var b = typeof this.I,
          a = a + (b + ":"),
          a = "number" === b ? a + Dc(this.I) : a + this.I;
        this.yb = rc(a)
      }
      return this.yb
    };
    h.Ha = function () {
      return this.I
    };
    h.uc = function (a) {
      if (a === Q) return 1;
      if (a instanceof T) return -1;
      z(a.R(), "Unknown node type");
      var b = typeof a.I,
        c = typeof this.I,
        d = $a(oe, b),
        e = $a(oe, c);
      z(0 <= d, "Unknown leaf type: " + b);
      z(0 <= e, "Unknown leaf type: " + c);
      return d === e ? "object" === c ? 0 : this.I < a.I ? -1 : this.I === a.I ? 0 : 1 : e - d
    };
    var oe = ["object", "boolean", "number", "string"];
    ae.prototype.pb = function () {
      return this
    };
    ae.prototype.Ac = function () {
      return !0
    };
    ae.prototype.da = function (a) {
      return a === this ? !0 : a.R() ? this.I === a.I && this.fa.da(a.fa) : !1
    };
    ae.prototype.toString = function () {
      return u(this.O(!0))
    };

    function pe(a, b) {
      this.Ra = a;
      this.Ca = b ? b : qe
    }
    h = pe.prototype;
    h.Sa = function (a, b) {
      return new pe(this.Ra, this.Ca.Sa(a, b, this.Ra).aa(null, null, re, null, null))
    };
    h.remove = function (a) {
      return new pe(this.Ra, this.Ca.remove(a, this.Ra).aa(null, null, re, null, null))
    };
    h.get = function (a) {
      for (var b, c = this.Ca; !c.f();) {
        b = this.Ra(a, c.key);
        if (0 === b) return c.value;
        0 > b ? c = c.left : 0 < b && (c = c.right)
      }
      return null
    };

    function se(a, b) {
      for (var c, d = a.Ca, e = null; !d.f();) {
        c = a.Ra(b, d.key);
        if (0 === c) {
          if (d.left.f()) return e ? e.key : null;
          for (d = d.left; !d.right.f();) d = d.right;
          return d.key
        }
        0 > c ? d = d.left : 0 < c && (e = d, d = d.right)
      }
      throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");
    }
    h.f = function () {
      return this.Ca.f()
    };
    h.count = function () {
      return this.Ca.count()
    };
    h.Ic = function () {
      return this.Ca.Ic()
    };
    h.ec = function () {
      return this.Ca.ec()
    };
    h.na = function (a) {
      return this.Ca.na(a)
    };
    h.Wb = function (a) {
      return new te(this.Ca, null, this.Ra, !1, a)
    };
    h.Xb = function (a, b) {
      return new te(this.Ca, a, this.Ra, !1, b)
    };
    h.Zb = function (a, b) {
      return new te(this.Ca, a, this.Ra, !0, b)
    };
    h.Ue = function (a) {
      return new te(this.Ca, null, this.Ra, !0, a)
    };

    function te(a, b, c, d, e) {
      this.Fd = e || null;
      this.me = d;
      for (this.Ta = []; !a.f();)
        if (e = b ? c(a.key, b) : 1, d && (e *= -1), 0 > e) a = this.me ? a.left : a.right;
        else if (0 === e) {
        this.Ta.push(a);
        break
      } else this.Ta.push(a), a = this.me ? a.right : a.left
    }

    function S(a) {
      if (0 === a.Ta.length) return null;
      var b = a.Ta.pop(),
        c;
      c = a.Fd ? a.Fd(b.key, b.value) : {
        key: b.key,
        value: b.value
      };
      if (a.me)
        for (b = b.left; !b.f();) a.Ta.push(b), b = b.right;
      else
        for (b = b.right; !b.f();) a.Ta.push(b), b = b.left;
      return c
    }

    function ue(a) {
      if (0 === a.Ta.length) return null;
      var b;
      b = a.Ta;
      b = b[b.length - 1];
      return a.Fd ? a.Fd(b.key, b.value) : {
        key: b.key,
        value: b.value
      }
    }

    function ve(a, b, c, d, e) {
      this.key = a;
      this.value = b;
      this.color = null != c ? c : we;
      this.left = null != d ? d : qe;
      this.right = null != e ? e : qe
    }
    var we = !0,
      re = !1;
    h = ve.prototype;
    h.aa = function (a, b, c, d, e) {
      return new ve(null != a ? a : this.key, null != b ? b : this.value, null != c ? c : this.color, null != d ? d : this.left, null != e ? e : this.right)
    };
    h.count = function () {
      return this.left.count() + 1 + this.right.count()
    };
    h.f = function () {
      return !1
    };
    h.na = function (a) {
      return this.left.na(a) || a(this.key, this.value) || this.right.na(a)
    };

    function xe(a) {
      return a.left.f() ? a : xe(a.left)
    }
    h.Ic = function () {
      return xe(this).key
    };
    h.ec = function () {
      return this.right.f() ? this.key : this.right.ec()
    };
    h.Sa = function (a, b, c) {
      var d, e;
      e = this;
      d = c(a, e.key);
      e = 0 > d ? e.aa(null, null, null, e.left.Sa(a, b, c), null) : 0 === d ? e.aa(null, b, null, null, null) : e.aa(null, null, null, null, e.right.Sa(a, b, c));
      return ye(e)
    };

    function ze(a) {
      if (a.left.f()) return qe;
      a.left.ia() || a.left.left.ia() || (a = Ae(a));
      a = a.aa(null, null, null, ze(a.left), null);
      return ye(a)
    }
    h.remove = function (a, b) {
      var c, d;
      c = this;
      if (0 > b(a, c.key)) c.left.f() || c.left.ia() || c.left.left.ia() || (c = Ae(c)), c = c.aa(null, null, null, c.left.remove(a, b), null);
      else {
        c.left.ia() && (c = Be(c));
        c.right.f() || c.right.ia() || c.right.left.ia() || (c = Ce(c), c.left.left.ia() && (c = Be(c), c = Ce(c)));
        if (0 === b(a, c.key)) {
          if (c.right.f()) return qe;
          d = xe(c.right);
          c = c.aa(d.key, d.value, null, null, ze(c.right))
        }
        c = c.aa(null, null, null, null, c.right.remove(a, b))
      }
      return ye(c)
    };
    h.ia = function () {
      return this.color
    };

    function ye(a) {
      a.right.ia() && !a.left.ia() && (a = De(a));
      a.left.ia() && a.left.left.ia() && (a = Be(a));
      a.left.ia() && a.right.ia() && (a = Ce(a));
      return a
    }

    function Ae(a) {
      a = Ce(a);
      a.right.left.ia() && (a = a.aa(null, null, null, null, Be(a.right)), a = De(a), a = Ce(a));
      return a
    }

    function De(a) {
      return a.right.aa(null, null, a.color, a.aa(null, null, we, null, a.right.left), null)
    }

    function Be(a) {
      return a.left.aa(null, null, a.color, null, a.aa(null, null, we, a.left.right, null))
    }

    function Ce(a) {
      return a.aa(null, null, !a.color, a.left.aa(null, null, !a.left.color, null, null), a.right.aa(null, null, !a.right.color, null, null))
    }

    function Ee() {}
    h = Ee.prototype;
    h.aa = function () {
      return this
    };
    h.Sa = function (a, b) {
      return new ve(a, b, null)
    };
    h.remove = function () {
      return this
    };
    h.count = function () {
      return 0
    };
    h.f = function () {
      return !0
    };
    h.na = function () {
      return !1
    };
    h.Ic = function () {
      return null
    };
    h.ec = function () {
      return null
    };
    h.ia = function () {
      return !1
    };
    var qe = new Ee;

    function T(a, b, c) {
      this.w = a;
      (this.fa = b) && me(this.fa);
      a.f() && z(!this.fa || this.fa.f(), "An empty node cannot have a priority");
      this.wb = c;
      this.yb = null
    }
    h = T.prototype;
    h.R = function () {
      return !1
    };
    h.G = function () {
      return this.fa || Q
    };
    h.ga = function (a) {
      return this.w.f() ? this : new T(this.w, a, this.wb)
    };
    h.P = function (a) {
      if (".priority" === a) return this.G();
      a = this.w.get(a);
      return null === a ? Q : a
    };
    h.sa = function (a) {
      var b = J(a);
      return null === b ? this : this.P(b).sa(K(a))
    };
    h.Ma = function (a) {
      return null !== this.w.get(a)
    };
    h.T = function (a, b) {
      z(b, "We should always be passing snapshot nodes");
      if (".priority" === a) return this.ga(b);
      var c = new O(a, b),
        d, e;
      b.f() ? (d = this.w.remove(a), c = ke(this.wb, c, this.w)) : (d = this.w.Sa(a, b), c = he(this.wb, c, this.w));
      e = d.f() ? Q : this.fa;
      return new T(d, e, c)
    };
    h.K = function (a, b) {
      var c = J(a);
      if (null === c) return b;
      z(".priority" !== J(a) || 1 === xd(a), ".priority must be the last token in a path");
      var d = this.P(c).K(K(a), b);
      return this.T(c, d)
    };
    h.f = function () {
      return this.w.f()
    };
    h.zb = function () {
      return this.w.count()
    };
    var Fe = /^(0|[1-9]\d*)$/;
    h = T.prototype;
    h.O = function (a) {
      if (this.f()) return null;
      var b = {},
        c = 0,
        d = 0,
        e = !0;
      this.W(R, function (f, g) {
        b[f] = g.O(a);
        c++;
        e && Fe.test(f) ? d = Math.max(d, Number(f)) : e = !1
      });
      if (!a && e && d < 2 * c) {
        var f = [],
          g;
        for (g in b) f[g] = b[g];
        return f
      }
      a && !this.G().f() && (b[".priority"] = this.G().O());
      return b
    };
    h.hash = function () {
      if (null === this.yb) {
        var a = "";
        this.G().f() || (a += "priority:" + ne(this.G().O()) + ":");
        this.W(R, function (b, c) {
          var d = c.hash();
          "" !== d && (a += ":" + b + ":" + d)
        });
        this.yb = "" === a ? "" : rc(a)
      }
      return this.yb
    };
    h.Te = function (a, b, c) {
      return (c = Ge(this, c)) ? (a = se(c, new O(a, b))) ? a.name : null : se(this.w, a)
    };

    function He(a, b) {
      var c;
      c = (c = Ge(a, b)) ? (c = c.Ic()) && c.name : a.w.Ic();
      return c ? new O(c, a.w.get(c)) : null
    }

    function Ie(a, b) {
      var c;
      c = (c = Ge(a, b)) ? (c = c.ec()) && c.name : a.w.ec();
      return c ? new O(c, a.w.get(c)) : null
    }
    h.W = function (a, b) {
      var c = Ge(this, a);
      return c ? c.na(function (a) {
        return b(a.name, a.node)
      }) : this.w.na(b)
    };
    h.Wb = function (a) {
      return this.Xb(Je, a)
    };
    h.Xb = function (a, b) {
      var c = Ge(this, b);
      if (c) return c.Xb(a, function (a) {
        return a
      });
      for (var c = this.w.Xb(a.name, ie), d = ue(c); null != d && 0 > b.compare(d, a);) S(c), d = ue(c);
      return c
    };
    h.Ue = function (a) {
      return this.Zb(a.Gc(), a)
    };
    h.Zb = function (a, b) {
      var c = Ge(this, b);
      if (c) return c.Zb(a, function (a) {
        return a
      });
      for (var c = this.w.Zb(a.name, ie), d = ue(c); null != d && 0 < b.compare(d, a);) S(c), d = ue(c);
      return c
    };
    h.uc = function (a) {
      return this.f() ? a.f() ? 0 : -1 : a.R() || a.f() ? 1 : a === Zd ? -1 : 0
    };
    h.pb = function (a) {
      if (a === ce || tb(this.wb.cc, a.toString())) return this;
      var b = this.wb,
        c = this.w;
      z(a !== ce, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
      for (var d = [], e = !1, c = c.Wb(ie), f = S(c); f;) e = e || a.zc(f.node), d.push(f), f = S(c);
      d = e ? je(d, Xd(a)) : Wd;
      e = a.toString();
      c = xb(b.cc);
      c[e] = a;
      a = xb(b.md);
      a[e] = d;
      return new T(this.w, this.fa, new ge(a, c))
    };
    h.Ac = function (a) {
      return a === ce || tb(this.wb.cc, a.toString())
    };
    h.da = function (a) {
      if (a === this) return !0;
      if (a.R()) return !1;
      if (this.G().da(a.G()) && this.w.count() === a.w.count()) {
        var b = this.Wb(R);
        a = a.Wb(R);
        for (var c = S(b), d = S(a); c && d;) {
          if (c.name !== d.name || !c.node.da(d.node)) return !1;
          c = S(b);
          d = S(a)
        }
        return null === c && null === d
      }
      return !1
    };

    function Ge(a, b) {
      return b === ce ? null : a.wb.get(b.toString())
    }
    h.toString = function () {
      return u(this.O(!0))
    };

    function P(a, b) {
      if (null === a) return Q;
      var c = null;
      "object" === typeof a && ".priority" in a ? c = a[".priority"] : "undefined" !== typeof b && (c = b);
      z(null === c || "string" === typeof c || "number" === typeof c || "object" === typeof c && ".sv" in c, "Invalid priority type found: " + typeof c);
      "object" === typeof a && ".value" in a && null !== a[".value"] && (a = a[".value"]);
      if ("object" !== typeof a || ".sv" in a) return new ae(a, P(c));
      if (a instanceof Array) {
        var d = Q,
          e = a;
        w(e, function (a, b) {
          if (pa(e, b) && "." !== b.substring(0, 1)) {
            var c = P(a);
            if (c.R() || !c.f()) d =
              d.T(b, c)
          }
        });
        return d.ga(P(c))
      }
      var f = [],
        g = !1,
        k = a;
      qa(k, function (a) {
        if ("string" !== typeof a || "." !== a.substring(0, 1)) {
          var b = P(k[a]);
          b.f() || (g = g || !b.G().f(), f.push(new O(a, b)))
        }
      });
      if (0 == f.length) return Q;
      var l = je(f, Td, function (a) {
        return a.name
      }, Ud);
      if (g) {
        var m = je(f, Xd(R));
        return new T(l, P(c), new ge({
          ".priority": m
        }, {
          ".priority": R
        }))
      }
      return new T(l, P(c), le)
    }
    var Ke = Math.log(2);

    function Le(a) {
      this.count = parseInt(Math.log(a + 1) / Ke, 10);
      this.Ke = this.count - 1;
      this.Hf = a + 1 & parseInt(Array(this.count + 1).join("1"), 2)
    }

    function Me(a) {
      var b = !(a.Hf & 1 << a.Ke);
      a.Ke--;
      return b
    }

    function je(a, b, c, d) {
      function e(b, d) {
        var f = d - b;
        if (0 == f) return null;
        if (1 == f) {
          var g = a[b],
            k = c ? c(g) : g;
          return new ve(k, g.node, re, null, null)
        }
        var g = parseInt(f / 2, 10) + b,
          f = e(b, g),
          A = e(g + 1, d),
          g = a[g],
          k = c ? c(g) : g;
        return new ve(k, g.node, re, f, A)
      }
      a.sort(b);
      var f = function (b) {
        function d(b, d) {
          var k = L - b,
            l = L;
          L -= b;
          var l = e(k + 1, l),
            k = a[k],
            m = c ? c(k) : k,
            l = new ve(m, k.node, d, null, l);
          f ? f.left = l : g = l;
          f = l
        }
        for (var f = null, g = null, L = a.length, A = 0; A < b.count; ++A) {
          var ca = Me(b),
            id = Math.pow(2, b.count - (A + 1));
          ca ? d(id, re) : (d(id, re), d(id, we))
        }
        return g
      }(new Le(a.length));
      return null !== f ? new pe(d || b, f) : new pe(d || b)
    }

    function ne(a) {
      return "number" === typeof a ? "number:" + Dc(a) : "string:" + a
    }

    function me(a) {
      if (a.R()) {
        var b = a.O();
        z("string" === typeof b || "number" === typeof b || "object" === typeof b && pa(b, ".sv"), "Priority must be a string or number.")
      } else z(a === Zd || a.f(), "priority of unexpected type.");
      z(a === Zd || a.G().f(), "Priority nodes can't have a priority of their own.")
    }
    var Q = new T(new pe(Ud), null, le);

    function Ne() {
      T.call(this, new pe(Ud), Q, le)
    }
    la(Ne, T);
    h = Ne.prototype;
    h.uc = function (a) {
      return a === this ? 0 : 1
    };
    h.da = function (a) {
      return a === this
    };
    h.G = function () {
      return this
    };
    h.P = function () {
      return Q
    };
    h.f = function () {
      return !1
    };
    var Zd = new Ne,
      Je = new O("[MIN_NAME]", Q),
      ee = new O("[MAX_NAME]", Zd);

    function U(a, b, c) {
      this.H = a;
      this.X = b;
      this.g = c
    }
    U.prototype.O = function () {
      F("Wilddog.DataSnapshot.val", 0, 0, arguments.length);
      return this.H.O()
    };
    U.prototype.val = U.prototype.O;
    U.prototype.Pe = function () {
      F("Wilddog.DataSnapshot.exportVal", 0, 0, arguments.length);
      return this.H.O(!0)
    };
    U.prototype.exportVal = U.prototype.Pe;
    U.prototype.Uf = function () {
      F("Wilddog.DataSnapshot.exists", 0, 0, arguments.length);
      return !this.H.f()
    };
    U.prototype.exists = U.prototype.Uf;
    U.prototype.u = function (a) {
      F("Wilddog.DataSnapshot.child", 0, 1, arguments.length);
      fa(a) && (a = String(a));
      Od("Wilddog.DataSnapshot.child", a);
      var b = new H(a),
        c = this.X.u(b);
      return new U(this.H.sa(b), c, R)
    };
    U.prototype.child = U.prototype.u;
    U.prototype.Ma = function (a) {
      F("Wilddog.DataSnapshot.hasChild", 1, 1, arguments.length);
      Od("Wilddog.DataSnapshot.hasChild", a);
      var b = new H(a);
      return !this.H.sa(b).f()
    };
    U.prototype.hasChild = U.prototype.Ma;
    U.prototype.G = function () {
      F("Wilddog.DataSnapshot.getPriority", 0, 0, arguments.length);
      return this.H.G().O()
    };
    U.prototype.getPriority = U.prototype.G;
    U.prototype.forEach = function (a) {
      F("Wilddog.DataSnapshot.forEach", 1, 1, arguments.length);
      G("Wilddog.DataSnapshot.forEach", 1, a, !1);
      if (this.H.R()) return !1;
      var b = this;
      return !!this.H.W(this.g, function (c, d) {
        return a(new U(d, b.X.u(c), R))
      })
    };
    U.prototype.forEach = U.prototype.forEach;
    U.prototype.gd = function () {
      F("Wilddog.DataSnapshot.hasChildren", 0, 0, arguments.length);
      return this.H.R() ? !1 : !this.H.f()
    };
    U.prototype.hasChildren = U.prototype.gd;
    U.prototype.name = function () {
      B("Wilddog.DataSnapshot.name() being deprecated. Please use Wilddog.DataSnapshot.key() instead.");
      F("Wilddog.DataSnapshot.name", 0, 0, arguments.length);
      return this.key()
    };
    U.prototype.name = U.prototype.name;
    U.prototype.key = function () {
      F("Wilddog.DataSnapshot.key", 0, 0, arguments.length);
      return this.X.key()
    };
    U.prototype.key = U.prototype.key;
    U.prototype.zb = function () {
      F("Wilddog.DataSnapshot.numChildren", 0, 0, arguments.length);
      return this.H.zb()
    };
    U.prototype.numChildren = U.prototype.zb;
    U.prototype.kc = function () {
      F("Wilddog.DataSnapshot.ref", 0, 0, arguments.length);
      return this.X
    };
    U.prototype.ref = U.prototype.kc;

    function Oe() {
      Gc.call(this, ["online"]);
      this.hc = !0;
      if ("undefined" !== typeof window && "undefined" !== typeof window.addEventListener) {
        var a = this;
        window.addEventListener("online", function () {
          a.hc || (a.hc = !0, a.Pd("online", !0))
        }, !1);
        window.addEventListener("offline", function () {
          a.hc && (a.hc = !1, a.Pd("online", !1))
        }, !1)
      }
    }
    la(Oe, Gc);
    Oe.prototype.ge = function (a) {
      z("online" === a, "Unknown event type: " + a);
      return [this.hc]
    };
    ba(Oe);

    function Pe() {
      Gc.call(this, ["visible"]);
      var a, b;
      "undefined" !== typeof document && "undefined" !== typeof document.addEventListener && ("undefined" !== typeof document.hidden ? (b = "visibilitychange", a = "hidden") : "undefined" !== typeof document.mozHidden ? (b = "mozvisibilitychange", a = "mozHidden") : "undefined" !== typeof document.msHidden ? (b = "msvisibilitychange", a = "msHidden") : "undefined" !== typeof document.webkitHidden && (b = "webkitvisibilitychange", a = "webkitHidden"));
      this.oc = !0;
      if (b) {
        var c = this;
        document.addEventListener(b,
          function () {
            var b = !document[a];
            b !== c.oc && (c.oc = b, c.Pd("visible", b))
          }, !1)
      }
    }
    la(Pe, Gc);
    Pe.prototype.ge = function (a) {
      z("visible" === a, "Unknown event type: " + a);
      return [this.oc]
    };
    ba(Pe);

    function Qe(a) {
      try {
        if ("undefined" !== typeof window && "undefined" !== typeof window[a]) {
          var b = window[a];
          b.setItem("wilddog:sentinel", "cache");
          b.removeItem("wilddog:sentinel")
        }
      } catch (c) {}
    }
    Qe("localStorage");
    Qe("sessionStorage");

    function Re(a, b, c, d, e, f) {
      this.id = a;
      this.o = vc("c:" + this.id + ":");
      this.wd = c;
      this.Mc = d;
      this.Aa = e;
      this.hg = f;
      this.F = b;
      this.Z = 0;
      this.o("Connection created");
      Se(this)
    }

    function Se(a) {
      Te(a, function (b) {
        a.Ja = b;
        a.Ja.on("open", Ue(a));
        a.Ja.on("error", Ve(a))
      })
    }

    function Ue(a) {
      return function () {
        a.Ja.on("message", We(a));
        a.Ja.on("close", Xe(a))
      }
    }

    function We(a) {
      return function (b) {
        if (null == b) throw Error("data is null");
        if (0 != b.charAt(0))
          if (2 == b.charAt(0)) {
            var c = null;
            try {
              c = JSON.parse(b.substr(1))
            } catch (d) {
              throw d;
            }
            if ("object" != typeof c || 2 > c.length) throw Error("decodedData in wrong format");
            b = c[1];
            "wd" == c[0] ? "c" == b.t ? (c = b.d, "h" == c.t ? Ye(a, c.d) : "r" == c.t ? (c = c.d, a.o("Reset packet received.  New host: " + c), Ze(a.F, c), a.close()) : "s" == c.t && (a.hg(c.d), a.close())) : "d" == b.t && a.wd(b.d) : a.o("eventType not known")
          } else 1 != b.charAt(0) && a.o("data format error")
      }
    }

    function Xe(a) {
      return function () {
        2 !== a.Z && (a.o("Closing realtime connection."), a.Z = 2, a.Aa && (a.Aa(), a.Aa = null))
      }
    }

    function Ve(a) {
      return function (b) {
        if (0 == a.Z) {
          var c = a.F.za,
            d = a.F;
          !fc.Sc && null != c && 0 > d.lb.indexOf(c) && c != d.host && (d.lb.push(c), v.set("failHosts", JSON.stringify(d.lb)));
          a.o("error while connecting", b, c);
          Ze(a.F)
        }
        a.close()
      }
    }

    function Ye(a, b) {
      var c = b.ts,
        d = b.v,
        e = b.h;
      a.sessionId = b.s;
      "1.0" != d && B("Protocol version mismatch detected");
      0 == a.Z && (e == a.F.za || a.F.tf ? (a.Z = 1, a.o("realtime state connected"), $e(a.F, a.F.za), a.Mc && (a.Mc(c), a.Mc = null)) : (Ze(a.F, e), a.o("updateHost ", e), a.Ja.close(), Te(a, function (b) {
        a.Ja = b;
        a.Ja.on("open", Ue(a));
        a.Ja.on("error", Ve(a))
      })))
    }

    function Te(a, b) {
      var c = ["websocket"];
      af(a, function (d) {
        d = (a.F.Hb ? "https://" : "http://") + d + "?v=1.0&cv=" + CLIENT_VERSION;
        var e = a.F;
        e.host !== e.za && (d = d + "&ns=" + a.F.pe);
        a.sessionId && (d = d + "&s=" + a.sessionId);
        0 < a.F.lb.length && (d = d + "&fst=" + encodeURIComponent(a.F.lb.join(",")));
        e = Ua.get("UUID");
        e || (e = a.Zd(), Ua.set("UUID", e));
        var f = {
          path: "/.ws",
          rememberUpgrade: !0
        };
        "undefined" == typeof document && (f.jsonp = !1);
        null != c && (f.transports = c);
        d = cc(d + "&did=" + e, f);
        Ra("new Socket_", typeof d);
        b(d)
      })
    }

    function af(a, b) {
      if (a.F.za) b(a.F.za);
      else {
        var c = ec(["XHR", "JSONP", "NodeHttp", "WxHttp"]),
          c = ab(c, function (a) {
            return "function" === typeof a.isAvailable && a.isAvailable()
          });
        0 === c.length ? setTimeout(function () {
          a.close()
        }, 0) : (new(c.shift())({
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })).open(("undefined" == typeof document ? "http" : "https") + "://ns.wilddog.com/v1/lookup?appId=" + a.F.pe, null, function (c, e) {
          c || !e.nss ? a.close() : (Ze(a.F, e.nss), b(e.nss))
        })
      }
    }
    Re.prototype.eb = function (a) {
      a = "2" + JSON.stringify(["wd", {
        t: "d",
        d: a
      }]);
      Ra("sendRequest by eio", a);
      this.Ja.send(a)
    };
    Re.prototype.close = function () {
      2 !== this.Z && (this.o("Closing realtime connection."), this.Z = 2, this.Ja && this.Ja.close(), this.Aa && (this.Aa(), this.Aa = null))
    };
    Re.prototype.Zd = function () {
      for (var a = 0, b = ""; 32 > a;) b += "0123456789abcdefghijklmnopqrstuvwxyz" [Math.floor(36 * Math.random())], a++;
      return b
    };

    function bf(a, b, c, d) {
      this.id = cf++;
      this.o = vc("p:" + this.id + ":");
      this.Ye = this.le = !1;
      this.ja = {};
      this.ta = [];
      this.Oc = 0;
      this.Kc = [];
      this.qa = !1;
      this.cb = 1E3;
      this.rd = 3E5;
      this.Cb = b;
      this.Jc = c;
      this.se = d;
      this.F = a;
      this.xe = null;
      this.Ed = {};
      this.qg = 0;
      this.Bc = this.ne = null;
      df(this, 0);
      Pe.Vb().Ab("visible", this.lg, this); - 1 === a.host.indexOf("wd.local") && Oe.Vb().Ab("online", this.jg, this)
    }
    var cf = 0,
      ef = 0;
    h = bf.prototype;
    h.eb = function (a, b, c) {
      var d = ++this.qg;
      a = {
        r: d,
        a: a,
        b: b
      };
      this.o(u(a));
      z(this.qa, "sendRequest call when we're not connected not allowed.");
      this.Va.eb(a);
      c && (this.Ed[d] = c)
    };
    h.Ze = function (a, b, c, d) {
      var e = ff(a),
        f = a.path.toString();
      this.o("Listen called for " + f + " " + e);
      this.ja[f] = this.ja[f] || {};
      z(!this.ja[f][e], "listen() called twice for same path/queryId.");
      a = {
        N: d,
        hd: b,
        query: a,
        tag: c
      };
      this.ja[f][e] = a;
      this.qa && gf(this, a)
    };

    function gf(a, b) {
      var c = b.query,
        d = c.path.toString(),
        e = ff(c);
      a.o("Listen on " + d + " for " + e);
      var f = {
        p: d
      };
      b.tag && (f.q = hf(c.B), f.t = b.tag);
      f.h = b.hd();
      a.eb("q", f, function (f) {
        var g = f.d,
          l = f.s;
        if (g && "object" === typeof g && pa(g, "w")) {
          var m = t(g, "w");
          ea(m) && 0 <= $a(m, "no_index") && B("Using an unspecified index. Consider adding " + ('".indexOn": "' + c.B.g.toString() + '"') + " at " + c.path.toString() + " to your security rules for better performance")
        }(a.ja[d] && a.ja[d][e]) === b && (a.o("listen response", f), "ok" !== l && jf(a, d, e), b.N &&
          b.N(l, g))
      })
    }
    h.Vd = function (a, b, c) {
      this.Ka = {
        Pf: a,
        Qe: !1,
        tc: b,
        Xc: c
      };
      this.o("Authenticating using credential: " + a);
      kf(this);
      40 == a.length && (this.o("Admin auth credential detected.  Reducing max reconnect time."), this.rd = 3E4)
    };
    h.wf = function (a) {
      delete this.Ka;
      this.qa && this.eb("unauth", {}, function (b) {
        a(b.s, b.d)
      })
    };

    function kf(a) {
      var b = a.Ka;
      a.qa && b && a.eb("auth", {
        cred: b.Pf
      }, function (c) {
        var d = c.s;
        c = c.d || "error";
        "ok" !== d && a.Ka === b && delete a.Ka;
        b.Qe ? "ok" !== d && b.Xc && b.Xc(d, c) : (b.Qe = !0, b.tc && b.tc(d, c))
      })
    }
    h.xf = function (a, b) {
      var c = a.path.toString(),
        d = ff(a);
      this.o("Unlisten called for " + c + " " + d);
      if (jf(this, c, d) && this.qa) {
        var e = hf(a.B);
        this.o("Unlisten on " + c + " for " + d);
        c = {
          p: c
        };
        b && (c.q = e, c.t = b);
        this.eb("n", c)
      }
    };
    h.re = function (a, b, c) {
      this.qa ? lf(this, "o", a, b, c) : this.Kc.push({
        Db: a,
        action: "o",
        data: b,
        N: c
      })
    };
    h.cf = function (a, b, c) {
      this.qa ? lf(this, "om", a, b, c) : this.Kc.push({
        Db: a,
        action: "om",
        data: b,
        N: c
      })
    };
    h.vd = function (a, b) {
      this.qa ? lf(this, "oc", a, null, b) : this.Kc.push({
        Db: a,
        action: "oc",
        data: null,
        N: b
      })
    };

    function lf(a, b, c, d, e) {
      c = {
        p: c,
        d: d
      };
      a.o("onDisconnect " + b, c);
      a.eb(b, c, function (a) {
        e && setTimeout(function () {
          e(a.s, a.d)
        }, Math.floor(0))
      })
    }
    h.put = function (a, b, c, d) {
      mf(this, "p", a, b, c, d)
    };
    h.af = function (a, b, c, d) {
      mf(this, "m", a, b, c, d)
    };

    function mf(a, b, c, d, e, f) {
      d = {
        p: c,
        d: d
      };
      p(f) && (d.h = f);
      a.ta.push({
        action: b,
        request: d,
        N: e
      });
      a.Oc++;
      b = a.ta.length - 1;
      a.qa ? nf(a, b) : a.o("Buffering put: " + c)
    }

    function nf(a, b) {
      var c = a.ta[b].action,
        d = a.ta[b].request,
        e = a.ta[b].N;
      a.ta[b].ng = a.qa;
      a.eb(c, d, function (d) {
        a.o(c + " response", d);
        delete a.ta[b];
        a.Oc--;
        0 === a.Oc && (a.ta = []);
        e && e(d.s, d.d)
      })
    }
    h.ve = function (a) {
      if (this.qa) {
        a = {
          c: a
        };
        this.o("reportStats", a);
        var b = this;
        this.eb("s", a, function (a) {
          "ok" !== a.s && b.o("reportStats", "Error sending stats: " + a.d)
        })
      }
    };
    h.gg = function (a) {
      if ("r" in a) {
        this.o("from server: " + u(a));
        var b = a.r,
          c = this.Ed[b];
        c && (delete this.Ed[b], c(a.b))
      } else {
        if ("error" in a) throw "A server-side error has occurred: " + a.error;
        "a" in a && (b = a.a, c = a.b, this.o("handleServerMessage", b, c), "d" === b ? this.Cb(c.p, c.d, !1, c.t) : "m" === b ? this.Cb(c.p, c.d, !0, c.t) : "c" === b ? of (this, c.p, c.q) : "ac" === b ? (a = c.s, b = c.d, c = this.Ka, delete this.Ka, c && c.Xc && c.Xc(a, b)) : "sd" === b ? this.xe ? this.xe(c) : "msg" in c && "undefined" !== typeof console && console.log("WILDDOG: " + c.msg.replace("\n",
          "\nWILDDOG: ")) : wc("Unrecognized action received from server: " + u(b) + "\nAre you using the latest client?"))
      }
    };
    h.Mc = function (a) {
      this.o("connection ready");
      this.qa = !0;
      this.Bc = (new Date).getTime();
      this.se({
        serverTimeOffset: a - (new Date).getTime()
      });
      a = Ua.get("UUID");
      a || (a = this.Zd(), Ua.set("UUID", a));
      var b = {};
      b["sdk.js." + CLIENT_VERSION.replace(/\./g, "-")] = 1;
      b.did = a;
      "undefined" !== typeof window && (window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(navigator.userAgent) && (b["framework.cordova"] = 1);
      this.ve(b);
      pf(this);
      this.Jc(!0)
    };

    function df(a, b) {
      z(!a.Va, "Scheduling a connect when we're already connected/ing?");
      a.Rb && clearTimeout(a.Rb);
      a.Rb = setTimeout(function () {
        a.Rb = null;
        qf(a)
      }, Math.floor(b))
    }
    h.lg = function (a) {
      a && !this.oc && this.cb === this.rd && (this.o("Window became visible.  Reducing delay."), this.cb = 1E3, this.Va || df(this, 0));
      this.oc = a
    };
    h.jg = function (a) {
      a ? (this.o("Browser went online."), this.cb = 1E3, this.Va || df(this, 0)) : (this.o("Browser went offline.  Killing connection."), this.Va && this.Va.close())
    };
    h.df = function () {
      this.o("data client disconnected");
      this.qa = !1;
      this.Va = null;
      for (var a = 0; a < this.ta.length; a++) {
        var b = this.ta[a];
        b && "h" in b.request && b.ng && (b.N && b.N("disconnect"), delete this.ta[a], this.Oc--)
      }
      0 === this.Oc && (this.ta = []);
      this.Ed = {};
      rf(this) && (this.oc ? this.Bc && (3E4 < (new Date).getTime() - this.Bc && (this.cb = 1E3), this.Bc = null) : (this.o("Window isn't visible.  Delaying reconnect."), this.cb = this.rd, this.ne = (new Date).getTime()), a = Math.max(0, this.cb - ((new Date).getTime() - this.ne)), a *= Math.random(),
        this.o("Trying to reconnect in " + a + "ms"), df(this, a), this.cb = Math.min(this.rd, 1.3 * this.cb));
      this.Jc(!1)
    };

    function qf(a) {
      if (rf(a)) {
        a.o("Making a connection attempt");
        a.ne = (new Date).getTime();
        a.Bc = null;
        var b = r(a.gg, a),
          c = r(a.Mc, a),
          d = r(a.df, a),
          e = a.id + ":" + ef++;
        a.Va = new Re(e, a.F, b, c, d, function (b) {
          B(b + " (" + a.F.toString() + ")");
          a.Ye = !0
        })
      }
    }
    h.yc = function () {
      this.le = !0;
      this.Va ? this.Va.close() : (this.Rb && (clearTimeout(this.Rb), this.Rb = null), this.qa && this.df())
    };
    h.resume = function () {
      this.le = !1;
      this.cb = 1E3;
      this.Va || df(this, 0)
    };

    function of (a, b, c) {
      c = c ? bb(c, function (a) {
        return Bc(a)
      }).join("$") : "default";
      (a = jf(a, b, c)) && a.N && a.N("permission_denied")
    }

    function jf(a, b, c) {
      b = (new H(b)).toString();
      var d;
      p(a.ja[b]) ? (d = a.ja[b][c], delete a.ja[b][c], 0 === ob(a.ja[b]) && delete a.ja[b]) : d = void 0;
      return d
    }

    function pf(a) {
      kf(a);
      w(a.ja, function (b) {
        w(b, function (b) {
          gf(a, b)
        })
      });
      for (var b = 0; b < a.ta.length; b++) a.ta[b] && nf(a, b);
      for (; a.Kc.length;) b = a.Kc.shift(), lf(a, b.action, b.Db, b.data, b.N)
    }

    function rf(a) {
      var b;
      b = Oe.Vb().hc;
      return !a.Ye && !a.le && b
    }
    h.Zd = function () {
      for (var a = 0, b = ""; 32 > a;) b += "0123456789abcdefghijklmnopqrstuvwxyz" [Math.floor(36 * Math.random())], a++;
      return b
    };

    function sf(a, b) {
      this.o = vc("p:rest:");
      this.F = a;
      this.Cb = b;
      this.Ka = null;
      this.ja = {}
    }

    function tf(a, b) {
      if (p(b)) return "tag$" + b;
      var c = a.B;
      z(uf(c) && c.g == R, "should have a tag if it's not a default query.");
      return a.path.toString()
    }
    h = sf.prototype;
    h.Ze = function (a, b, c, d) {
      var e = a.path.toString();
      this.o("Listen called for " + e + " " + ff(a));
      var f = tf(a, c),
        g = {};
      this.ja[f] = g;
      a = vf(a.B);
      var k = this;
      wf(this, e + ".json", a, function (a, b) {
        var l = b;
        404 === a && (a = l = null);
        null === a && k.Cb(e, l, !1, c);
        t(k.ja, f) === g && d(a ? 401 == a ? "permission_denied" : "rest_error:" + a : "ok", null)
      })
    };
    h.xf = function (a, b) {
      var c = tf(a, b);
      delete this.ja[c]
    };
    h.Vd = function (a, b) {
      this.Ka = a;
      var c = ad(a),
        d = c.data,
        c = c.Yd && c.Yd.exp;
      b && b("ok", {
        auth: d,
        expires: c
      })
    };
    h.wf = function (a) {
      this.Ka = null;
      a("ok", null)
    };
    h.re = function () {};
    h.cf = function () {};
    h.vd = function () {};
    h.put = function () {};
    h.af = function () {};
    h.ve = function () {};

    function wf(a, b, c, d) {
      c = c || {};
      c.format = "export";
      a.Ka && (c.auth = a.Ka);
      var e = (a.F.Hb ? "https://" : "http://") + a.F.host + b + "?" + sa(c);
      a.o("Sending REST request for " + e);
      var f = new XMLHttpRequest;
      f.onreadystatechange = function () {
        if (d && 4 === f.readyState) {
          a.o("REST Response for " + e + " received. status:", f.status, "response:", f.responseText);
          var b = null;
          if (200 <= f.status && 300 > f.status) {
            try {
              b = Ca(f.responseText)
            } catch (k) {
              B("Failed to parse JSON response for " + e + ": " + f.responseText)
            }
            d(null, b)
          } else 401 !== f.status && 404 !==
            f.status && B("Got unsuccessful REST response for " + e + " Status: " + f.status), d(f.status);
          d = null
        }
      };
      f.open("GET", e, !0);
      f.send()
    };

    function xf() {
      this.Gd = Q
    }
    xf.prototype.j = function (a) {
      return this.Gd.sa(a)
    };
    xf.prototype.toString = function () {
      return this.Gd.toString()
    };

    function yf() {
      this.set = {}
    }
    h = yf.prototype;
    h.add = function (a, b) {
      this.set[a] = null !== b ? b : !0
    };
    h.contains = function (a) {
      return pa(this.set, a)
    };
    h.get = function (a) {
      return this.contains(a) ? this.set[a] : void 0
    };
    h.remove = function (a) {
      delete this.set[a]
    };
    h.clear = function () {
      this.set = {}
    };
    h.f = function () {
      return wb(this.set)
    };
    h.count = function () {
      return ob(this.set)
    };

    function zf(a, b) {
      w(a.set, function (a, d) {
        b(d, a)
      })
    }
    h.keys = function () {
      var a = [];
      w(this.set, function (b, c) {
        a.push(c)
      });
      return a
    };

    function Af() {
      this.w = this.I = null
    }
    Af.prototype.find = function (a) {
      if (null != this.I) return this.I.sa(a);
      if (a.f() || null == this.w) return null;
      var b = J(a);
      a = K(a);
      return this.w.contains(b) ? this.w.get(b).find(a) : null
    };

    function Bf(a, b, c) {
      if (b.f()) a.I = c, a.w = null;
      else if (null !== a.I) a.I = a.I.K(b, c);
      else {
        null == a.w && (a.w = new yf);
        var d = J(b);
        a.w.contains(d) || a.w.add(d, new Af);
        a = a.w.get(d);
        b = K(b);
        Bf(a, b, c)
      }
    }

    function Cf(a, b) {
      if (b.f()) return a.I = null, a.w = null, !0;
      if (null !== a.I) {
        if (a.I.R()) return !1;
        var c = a.I;
        a.I = null;
        c.W(R, function (b, c) {
          Bf(a, new H(b), c)
        });
        return Cf(a, b)
      }
      return null !== a.w ? (c = J(b), b = K(b), a.w.contains(c) && Cf(a.w.get(c), b) && a.w.remove(c), a.w.f() ? (a.w = null, !0) : !1) : !0
    }

    function Df(a, b, c) {
      null !== a.I ? c(b, a.I) : a.W(function (a, e) {
        var d = new H(b.toString() + "/" + a);
        Df(e, d, c)
      })
    }
    Af.prototype.W = function (a) {
      null !== this.w && zf(this.w, function (b, c) {
        a(b, c)
      })
    };

    function Ef(a, b) {
      this.type = Ff;
      this.source = Gf;
      this.path = a;
      this.we = b
    }
    Ef.prototype.Nc = function () {
      return this.path.f() ? this : new Ef(K(this.path), this.we)
    };
    Ef.prototype.toString = function () {
      return "Operation(" + this.path + ": " + this.source.toString() + " ack write revert=" + this.we + ")"
    };

    function Hf(a, b, c) {
      this.type = If;
      this.source = a;
      this.path = b;
      this.children = c
    }
    Hf.prototype.Nc = function (a) {
      if (this.path.f()) return a = this.children.subtree(new H(a)), a.f() ? null : a.value ? new Jf(this.source, M, a.value) : new Hf(this.source, M, a);
      z(J(this.path) === a, "Can't get a merge for a child not on the path of the operation");
      return new Hf(this.source, K(this.path), this.children)
    };
    Hf.prototype.toString = function () {
      return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")"
    };

    function Jf(a, b, c) {
      this.type = Kf;
      this.source = a;
      this.path = b;
      this.Na = c
    }
    Jf.prototype.Nc = function (a) {
      return this.path.f() ? new Jf(this.source, M, this.Na.P(a)) : new Jf(this.source, K(this.path), this.Na)
    };
    Jf.prototype.toString = function () {
      return "Operation(" + this.path + ": " + this.source.toString() + " overwrite: " + this.Na.toString() + ")"
    };

    function Lf(a, b) {
      this.type = Mf;
      this.source = a;
      this.path = b
    }
    Lf.prototype.Nc = function () {
      return this.path.f() ? new Lf(this.source, M) : new Lf(this.source, K(this.path))
    };
    Lf.prototype.toString = function () {
      return "Operation(" + this.path + ": " + this.source.toString() + " listen_complete)"
    };
    var Kf = 0,
      If = 1,
      Ff = 2,
      Mf = 3;

    function Nf(a, b, c, d) {
      this.de = a;
      this.Re = b;
      this.Fb = c;
      this.De = d;
      z(!d || b, "Tagged queries must be from server.")
    }
    var Gf = new Nf(!0, !1, null, !1),
      Of = new Nf(!1, !0, null, !1);
    Nf.prototype.toString = function () {
      return this.de ? "user" : this.De ? "server(queryID=" + this.Fb + ")" : "server"
    };

    function Pf(a, b) {
      this.value = a;
      this.children = b || Qf
    }
    var Qf = new pe(function (a, b) {
      return a === b ? 0 : a < b ? -1 : 1
    });

    function Rf(a) {
      var b = Sf;
      w(a, function (a, d) {
        b = b.set(new H(d), a)
      });
      return b
    }
    h = Pf.prototype;
    h.f = function () {
      return null === this.value && this.children.f()
    };

    function Tf(a, b, c) {
      if (null != a.value && c(a.value)) return {
        path: M,
        value: a.value
      };
      if (b.f()) return null;
      var d = J(b);
      a = a.children.get(d);
      return null !== a ? (b = Tf(a, K(b), c), null != b ? {
        path: (new H(d)).u(b.path),
        value: b.value
      } : null) : null
    }

    function Uf(a, b) {
      return Tf(a, b, function () {
        return !0
      })
    }
    h.subtree = function (a) {
      if (a.f()) return this;
      var b = this.children.get(J(a));
      return null !== b ? b.subtree(K(a)) : Sf
    };
    h.set = function (a, b) {
      if (a.f()) return new Pf(b, this.children);
      var c = J(a),
        d = (this.children.get(c) || Sf).set(K(a), b),
        c = this.children.Sa(c, d);
      return new Pf(this.value, c)
    };
    h.remove = function (a) {
      if (a.f()) return this.children.f() ? Sf : new Pf(null, this.children);
      var b = J(a),
        c = this.children.get(b);
      return c ? (a = c.remove(K(a)), b = a.f() ? this.children.remove(b) : this.children.Sa(b, a), null === this.value && b.f() ? Sf : new Pf(this.value, b)) : this
    };
    h.get = function (a) {
      if (a.f()) return this.value;
      var b = this.children.get(J(a));
      return b ? b.get(K(a)) : null
    };

    function Vf(a, b, c) {
      if (b.f()) return c;
      var d = J(b);
      b = Vf(a.children.get(d) || Sf, K(b), c);
      d = b.f() ? a.children.remove(d) : a.children.Sa(d, b);
      return new Pf(a.value, d)
    }

    function Wf(a, b) {
      return Xf(a, M, b)
    }

    function Xf(a, b, c) {
      var d = {};
      a.children.na(function (a, f) {
        d[a] = Xf(f, b.u(a), c)
      });
      return c(b, a.value, d)
    }

    function Yf(a, b, c) {
      return Zf(a, b, M, c)
    }

    function Zf(a, b, c, d) {
      var e = a.value ? d(c, a.value) : !1;
      if (e) return e;
      if (b.f()) return null;
      e = J(b);
      return (a = a.children.get(e)) ? Zf(a, K(b), c.u(e), d) : null
    }

    function $f(a, b, c) {
      if (!b.f()) {
        var d = !0;
        a.value && (d = c(M, a.value));
        !0 === d && (d = J(b), (a = a.children.get(d)) && ag(a, K(b), M.u(d), c))
      }
    }

    function ag(a, b, c, d) {
      if (b.f()) return a;
      a.value && d(c, a.value);
      var e = J(b);
      return (a = a.children.get(e)) ? ag(a, K(b), c.u(e), d) : Sf
    }

    function bg(a, b) {
      cg(a, M, b)
    }

    function cg(a, b, c) {
      a.children.na(function (a, e) {
        cg(e, b.u(a), c)
      });
      a.value && c(b, a.value)
    }

    function dg(a, b) {
      a.children.na(function (a, d) {
        d.value && b(a, d.value)
      })
    }
    var Sf = new Pf(null);
    Pf.prototype.toString = function () {
      var a = {};
      bg(this, function (b, c) {
        a[b.toString()] = c.toString()
      });
      return u(a)
    };

    function eg(a, b, c) {
      this.H = a;
      this.M = b;
      this.Sb = c
    }

    function fg(a, b) {
      return a.M && !a.Sb || a.H.Ma(b)
    }
    eg.prototype.j = function () {
      return this.H
    };

    function gg(a, b) {
      this.J = a;
      this.Hd = b
    }

    function hg(a, b, c, d) {
      return new gg(new eg(b, c, d), a.Hd)
    }

    function ig(a) {
      return a.J.M ? a.J.j() : null
    }
    gg.prototype.C = function () {
      return this.Hd
    };

    function jg(a) {
      return a.Hd.M ? a.Hd.j() : null
    };

    function V(a, b, c, d) {
      this.type = a;
      this.Oa = b;
      this.$a = c;
      this.qe = d;
      this.Bd = void 0
    };

    function kg(a, b, c, d) {
      this.$d = b;
      this.Id = c;
      this.Bd = d;
      this.dd = a
    }
    kg.prototype.Yb = function () {
      var a = this.Id.kc();
      return "value" === this.dd ? a.path : a.parent().path
    };
    kg.prototype.fe = function () {
      return this.dd
    };
    kg.prototype.Tb = function () {
      return this.$d.Tb(this)
    };
    kg.prototype.toString = function () {
      return this.Yb().toString() + ":" + this.dd + ":" + u(this.Id.Pe())
    };

    function lg(a, b, c) {
      this.$d = a;
      this.error = b;
      this.path = c
    }
    lg.prototype.Yb = function () {
      return this.path
    };
    lg.prototype.fe = function () {
      return "cancel"
    };
    lg.prototype.Tb = function () {
      return this.$d.Tb(this)
    };
    lg.prototype.toString = function () {
      return this.path.toString() + ":cancel"
    };

    function mg(a, b, c) {
      this.Pb = a;
      this.sb = b;
      this.tb = c || null
    }
    h = mg.prototype;
    h.pf = function (a) {
      return "value" === a
    };
    h.createEvent = function (a, b) {
      var c = b.B.g;
      return new kg("value", this, new U(a.Oa, b.kc(), c))
    };
    h.Tb = function (a) {
      var b = this.tb;
      if ("cancel" === a.fe()) {
        z(this.sb, "Raising a cancel event on a listener with no cancel callback");
        var c = this.sb;
        return function () {
          c.call(b, a.error)
        }
      }
      var d = this.Pb;
      return function () {
        d.call(b, a.Id)
      }
    };
    h.Je = function (a, b) {
      return this.sb ? new lg(this, a, b) : null
    };
    h.matches = function (a) {
      return a instanceof mg ? a.Pb && this.Pb ? a.Pb === this.Pb && a.tb === this.tb : !0 : !1
    };
    h.Ve = function () {
      return null !== this.Pb
    };

    function ng(a, b, c) {
      this.ma = a;
      this.sb = b;
      this.tb = c
    }
    h = ng.prototype;
    h.pf = function (a) {
      a = "children_added" === a ? "child_added" : a;
      return sb(this.ma, "children_removed" === a ? "child_removed" : a)
    };
    h.Je = function (a, b) {
      return this.sb ? new lg(this, a, b) : null
    };
    h.createEvent = function (a, b) {
      z(null != a.$a, "Child events should have a childName.");
      var c = b.kc().u(a.$a);
      return new kg(a.type, this, new U(a.Oa, c, b.B.g), a.Bd)
    };
    h.Tb = function (a) {
      var b = this.tb;
      if ("cancel" === a.fe()) {
        z(this.sb, "Raising a cancel event on a listener with no cancel callback");
        var c = this.sb;
        return function () {
          c.call(b, a.error)
        }
      }
      var d = this.ma[a.dd];
      return function () {
        d.call(b, a.Id, a.Bd)
      }
    };
    h.matches = function (a) {
      if (a instanceof ng) {
        if (!this.ma || !a.ma) return !0;
        if (this.tb === a.tb) {
          var b = ob(a.ma);
          if (b === ob(this.ma)) {
            if (1 === b) {
              var b = pb(a.ma),
                c = pb(this.ma);
              return c === b && (!a.ma[b] || !this.ma[c] || a.ma[b] === this.ma[c])
            }
            return nb(this.ma, function (b, c) {
              return a.ma[c] === b
            })
          }
        }
      }
      return !1
    };
    h.Ve = function () {
      return null !== this.ma
    };

    function og(a) {
      this.X = a;
      this.g = a.B.g
    }

    function pg(a, b, c, d) {
      var e = [],
        f = [];
      ta(b, function (b) {
        "child_changed" === b.type && a.g.ld(b.qe, b.Oa) && f.push(new V("child_moved", b.Oa, b.$a))
      });
      qg(a, e, "child_removed", b, d, c);
      qg(a, e, "child_added", b, d, c);
      qg(a, e, "child_moved", f, d, c);
      qg(a, e, "child_changed", b, d, c);
      qg(a, e, "value", b, d, c);
      return e
    }

    function qg(a, b, c, d, e, f) {
      d = ab(d, function (a) {
        return a.type === c
      });
      hb(d, r(a.Kf, a));
      ta(d, function (c) {
        var d = rg(a, c, f);
        ta(e, function (e) {
          e.pf(c.type) && b.push(e.createEvent(d, a.X))
        })
      })
    }

    function rg(a, b, c) {
      "value" !== b.type && "child_removed" !== b.type && (b.Bd = c.Te(b.$a, b.Oa, a.g));
      return b
    }
    og.prototype.Kf = function (a, b) {
      if (null == a.$a || null == b.$a) throw pc("Should only compare child_ events.");
      return this.g.compare(new O(a.$a, a.Oa), new O(b.$a, b.Oa))
    };

    function sg() {}
    sg.prototype.Se = function () {
      return null
    };
    sg.prototype.ee = function () {
      return null
    };
    var tg = new sg;

    function ug(a, b, c) {
      this.yf = a;
      this.Pa = b;
      this.xd = c
    }
    ug.prototype.Se = function (a) {
      var b = this.Pa.J;
      if (fg(b, a)) return b.j().P(a);
      b = null != this.xd ? new eg(this.xd, !0, !1) : this.Pa.C();
      return this.yf.Za(a, b)
    };
    ug.prototype.ee = function (a, b, c) {
      var d = null != this.xd ? this.xd : jg(this.Pa);
      a = this.yf.Xd(d, b, 1, c, a);
      return 0 === a.length ? null : a[0]
    };

    function vg(a, b) {
      this.Rd = a;
      this.If = b
    }

    function wg(a) {
      this.L = a
    }
    wg.prototype.fb = function (a, b, c, d) {
      var e = new xg,
        f;
      if (b.type === Kf) b.source.de ? c = yg(this, a, b.path, b.Na, c, d, e) : (z(b.source.Re, "Unknown source."), f = b.source.De, c = zg(this, a, b.path, b.Na, c, d, f, e));
      else if (b.type === If) b.source.de ? c = Ag(this, a, b.path, b.children, c, d, e) : (z(b.source.Re, "Unknown source."), f = b.source.De, c = Bg(this, a, b.path, b.children, c, d, f, e));
      else if (b.type === Ff)
        if (b.we)
          if (f = b.path, null != c.mc(f)) c = a;
          else {
            b = new ug(c, a, d);
            d = a.J.j();
            if (f.f() || ".priority" === J(f)) a.C().M ? b = c.ya(jg(a)) : (b = a.C().j(), z(b instanceof T, "serverChildren would be complete if leaf node"), b = c.sc(b)), b = this.L.xa(d, b, e);
            else {
              f = J(f);
              var g = c.Za(f, a.C());
              null == g && fg(a.C(), f) && (g = d.P(f));
              b = null != g ? this.L.K(d, f, g, b, e) : a.J.j().Ma(f) ? this.L.K(d, f, Q, b, e) : d;
              b.f() && a.C().M && (d = c.ya(jg(a)), d.R() && (b = this.L.xa(b, d, e)))
            }
            d = a.C().M || null != c.mc(M);
            c = hg(a, b, d, this.L.La())
          }
      else c = Cg(this, a, b.path, c, d, e);
      else if (b.type === Mf) d = b.path, b = a.C(), f = b.j(), g = b.M || d.f(), c = Dg(this, new gg(a.J, new eg(f, g, b.Sb)), d, c, tg, e);
      else throw pc("Unknown operation type: " + b.type);
      e = qb(e.kb);
      d = c;
      b = d.J;
      b.M && (f = b.j().R() || b.j().f(), g = ig(a), (0 < e.length || !a.J.M || f && !b.j().da(g) || !b.j().G().da(g.G())) && e.push(new V("value", ig(d))));
      return new vg(c, e)
    };

    function Dg(a, b, c, d, e, f) {
      var g = b.J;
      if (null != d.mc(c)) return b;
      var k;
      if (c.f()) z(b.C().M, "If change path is empty, we must have complete server data"), b.C().Sb ? (e = jg(b), d = d.sc(e instanceof T ? e : Q)) : d = d.ya(jg(b)), f = a.L.xa(b.J.j(), d, f);
      else {
        var l = J(c);
        if (".priority" == l) z(1 == xd(c), "Can't have a priority with additional path components"), f = g.j(), k = b.C().j(), d = d.Wc(c, f, k), f = null != d ? a.L.ga(f, d) : g.j();
        else {
          var m = K(c);
          fg(g, l) ? (k = b.C().j(), d = d.Wc(c, g.j(), k), d = null != d ? g.j().P(l).K(m, d) : g.j().P(l)) : d = d.Za(l, b.C());
          f = null != d ? a.L.K(g.j(), l, d, e, f) : g.j()
        }
      }
      return hg(b, f, g.M || c.f(), a.L.La())
    }

    function zg(a, b, c, d, e, f, g, k) {
      var l = b.C();
      g = g ? a.L : a.L.Ub();
      if (c.f()) d = g.xa(l.j(), d, null);
      else if (g.La() && !l.Sb) d = l.j().K(c, d), d = g.xa(l.j(), d, null);
      else {
        var m = J(c);
        if ((c.f() ? !l.M || l.Sb : !fg(l, J(c))) && 1 < xd(c)) return b;
        d = l.j().P(m).K(K(c), d);
        d = ".priority" == m ? g.ga(l.j(), d) : g.K(l.j(), m, d, tg, null)
      }
      l = l.M || c.f();
      b = new gg(b.J, new eg(d, l, g.La()));
      return Dg(a, b, c, e, new ug(e, b, f), k)
    }

    function yg(a, b, c, d, e, f, g) {
      var k = b.J;
      e = new ug(e, b, f);
      if (c.f()) g = a.L.xa(b.J.j(), d, g), a = hg(b, g, !0, a.L.La());
      else if (f = J(c), ".priority" === f) g = a.L.ga(b.J.j(), d), a = hg(b, g, k.M, k.Sb);
      else {
        var l = K(c);
        c = k.j().P(f);
        if (!l.f()) {
          var m = e.Se(f);
          d = null != m ? ".priority" === yd(l) && m.sa(l.parent()).f() ? m : m.K(l, d) : Q
        }
        c.da(d) ? a = b : (g = a.L.K(k.j(), f, d, e, g), a = hg(b, g, k.M, a.L.La()))
      }
      return a
    }

    function Ag(a, b, c, d, e, f, g) {
      var k = b;
      bg(d, function (d, m) {
        var l = c.u(d);
        fg(b.J, J(l)) && (k = yg(a, k, l, m, e, f, g))
      });
      bg(d, function (d, m) {
        var l = c.u(d);
        fg(b.J, J(l)) || (k = yg(a, k, l, m, e, f, g))
      });
      return k
    }

    function Eg(a, b) {
      bg(b, function (b, d) {
        a = a.K(b, d)
      });
      return a
    }

    function Bg(a, b, c, d, e, f, g, k) {
      if (b.C().j().f() && !b.C().M) return b;
      var l = b;
      c = c.f() ? d : Vf(Sf, c, d);
      var m = b.C().j();
      c.children.na(function (c, d) {
        if (m.Ma(c)) {
          var A = b.C().j().P(c),
            A = Eg(A, d);
          l = zg(a, l, new H(c), A, e, f, g, k)
        }
      });
      c.children.na(function (c, d) {
        var A = !b.C().M && null == d.value;
        m.Ma(c) || A || (A = b.C().j().P(c), A = Eg(A, d), l = zg(a, l, new H(c), A, e, f, g, k))
      });
      return l
    }

    function Cg(a, b, c, d, e, f) {
      if (null != d.mc(c)) return b;
      var g = new ug(d, b, e),
        k = e = b.J.j();
      if (b.C().M) {
        if (c.f()) e = d.ya(jg(b)), k = a.L.xa(b.J.j(), e, f);
        else if (".priority" === J(c)) {
          var l = d.Za(J(c), b.C());
          null == l || e.f() || e.G().da(l) || (k = a.L.ga(e, l))
        } else l = J(c), e = d.Za(l, b.C()), null != e && (k = a.L.K(b.J.j(), l, e, g, f));
        e = !0
      } else if (b.J.M || c.f()) k = e, e = b.J.j(), e.R() || e.W(R, function (c) {
        var e = d.Za(c, b.C());
        null != e && (k = a.L.K(k, c, e, g, f))
      }), e = b.J.M;
      else {
        l = J(c);
        if (1 == xd(c) || fg(b.J, l)) c = d.Za(l, b.C()), null != c && (k = a.L.K(e, l, c, g,
          f));
        e = !1
      }
      return hg(b, k, e, a.L.La())
    };

    function Fg(a, b) {
      this.X = a;
      var c = a.B,
        d = new Gg(c.g),
        c = uf(c) ? new Gg(c.g) : c.oa ? new Hg(c) : new Ig(c);
      this.kf = new wg(c);
      var e = b.C(),
        f = b.J,
        g = d.xa(Q, e.j(), null),
        k = c.xa(Q, f.j(), null);
      this.Pa = new gg(new eg(k, f.M, c.La()), new eg(g, e.M, d.La()));
      this.ab = [];
      this.Rf = new og(a)
    }
    h = Fg.prototype;
    h.C = function () {
      return this.Pa.C().j()
    };
    h.mb = function (a) {
      var b = jg(this.Pa);
      return b && (uf(this.X.B) || !a.f() && !b.P(J(a)).f()) ? b.sa(a) : null
    };
    h.f = function () {
      return 0 === this.ab.length
    };
    h.Lb = function (a) {
      this.ab.push(a)
    };
    h.nb = function (a, b) {
      var c = [];
      if (b) {
        z(null == a, "A cancel should cancel all event registrations.");
        var d = this.X.path;
        ta(this.ab, function (a) {
          (a = a.Je(b, d)) && c.push(a)
        })
      }
      if (a) {
        for (var e = [], f = 0; f < this.ab.length; ++f) {
          var g = this.ab[f];
          if (!g.matches(a)) e.push(g);
          else if (a.Ve()) {
            e = e.concat(this.ab.slice(f + 1));
            break
          }
        }
        this.ab = e
      } else this.ab = [];
      return c
    };
    h.fb = function (a, b, c) {
      a.type === If && null !== a.source.Fb && (z(jg(this.Pa), "We should always have a full cache before handling merges"), z(ig(this.Pa), "Missing event cache, even though we have a server cache"));
      var d = this.Pa;
      a = this.kf.fb(d, a, b, c);
      b = this.kf;
      c = a.Rd;
      z(c.J.j().Ac(b.L.g), "Event snap not indexed");
      z(c.C().j().Ac(b.L.g), "Server snap not indexed");
      z(a.Rd.C().M || !d.C().M, "Once a server snap is complete, it should never go back");
      this.Pa = a.Rd;
      return Jg(this, a.If, a.Rd.J.j(), null)
    };

    function Kg(a, b) {
      var c = a.Pa.J,
        d = [];
      c.j().R() || c.j().W(R, function (a, b) {
        d.push(new V("child_added", b, a))
      });
      c.M && d.push(new V("value", c.j()));
      return Jg(a, d, c.j(), b)
    }

    function Jg(a, b, c, d) {
      return pg(a.Rf, b, c, d ? [d] : a.ab)
    };

    function Lg() {
      this.Da = {}
    }
    h = Lg.prototype;
    h.f = function () {
      return wb(this.Da)
    };
    h.fb = function (a, b, c) {
      var d = a.source.Fb;
      if (null !== d) return d = t(this.Da, d), z(null != d, "SyncTree gave us an op for an invalid query."), d.fb(a, b, c);
      var e = [];
      w(this.Da, function (d) {
        e = e.concat(d.fb(a, b, c))
      });
      return e
    };
    h.Lb = function (a, b, c, d, e) {
      var f = ff(a),
        g = t(this.Da, f);
      g || ((g = c.ya(e ? d : null)) ? c = !0 : (g = d instanceof T ? c.sc(d) : Q, c = !1), g = new Fg(a, new gg(new eg(g, c, !1), new eg(d, e, !1))), this.Da[f] = g);
      g.Lb(b);
      return Kg(g, b)
    };
    h.nb = function (a, b, c) {
      var d = ff(a),
        e = [],
        f = [],
        g = null != Mg(this);
      if ("default" === d) {
        var k = this;
        w(this.Da, function (a, d) {
          f = f.concat(a.nb(b, c));
          a.f() && (delete k.Da[d], uf(a.X.B) || e.push(a.X))
        })
      } else {
        var l = t(this.Da, d);
        l && (f = f.concat(l.nb(b, c)), l.f() && (delete this.Da[d], uf(l.X.B) || e.push(l.X)))
      }
      g && null == Mg(this) && e.push(new W(a.D.la, a.D, a.path));
      return {
        pg: e,
        Sf: f
      }
    };

    function Ng(a) {
      return ab(qb(a.Da), function (a) {
        return !uf(a.X.B)
      })
    }
    h.mb = function (a) {
      var b = null;
      w(this.Da, function (c) {
        b = b || c.mb(a)
      });
      return b
    };

    function Og(a, b) {
      if (uf(b.B)) return Mg(a);
      var c = ff(b);
      return t(a.Da, c)
    }

    function Mg(a) {
      return vb(a.Da, function (a) {
        return uf(a.X.B)
      }) || null
    };

    function Pg(a) {
      this.$ = a
    }
    var Qg = new Pg(new Pf(null));

    function Rg(a, b, c) {
      if (b.f()) return new Pg(new Pf(c));
      var d = Uf(a.$, b);
      if (null != d) {
        var e = d.path,
          d = d.value;
        b = I(e, b);
        d = d.K(b, c);
        return new Pg(a.$.set(e, d))
      }
      a = Vf(a.$, b, new Pf(c));
      return new Pg(a)
    }

    function Sg(a, b, c) {
      var d = a;
      qa(c, function (a, c) {
        d = Rg(d, b.u(a), c)
      });
      return d
    }
    Pg.prototype.Cd = function (a) {
      if (a.f()) return Qg;
      a = Vf(this.$, a, Sf);
      return new Pg(a)
    };

    function Tg(a, b) {
      var c = Uf(a.$, b);
      return null != c ? a.$.get(c.path).sa(I(c.path, b)) : null
    }

    function Ug(a) {
      var b = [],
        c = a.$.value;
      null != c ? c.R() || c.W(R, function (a, c) {
        b.push(new O(a, c))
      }) : a.$.children.na(function (a, c) {
        null != c.value && b.push(new O(a, c.value))
      });
      return b
    }

    function Vg(a, b) {
      if (b.f()) return a;
      var c = Tg(a, b);
      return null != c ? new Pg(new Pf(c)) : new Pg(a.$.subtree(b))
    }
    Pg.prototype.f = function () {
      return this.$.f()
    };
    Pg.prototype.apply = function (a) {
      return Wg(M, this.$, a)
    };

    function Wg(a, b, c) {
      if (null != b.value) return c.K(a, b.value);
      var d = null;
      b.children.na(function (b, f) {
        ".priority" === b ? (z(null !== f.value, "Priority writes must always be leaf nodes"), d = f.value) : c = Wg(a.u(b), f, c)
      });
      c.sa(a).f() || null === d || (c = c.K(a.u(".priority"), d));
      return c
    };

    function Xg() {
      this.V = Qg;
      this.Ea = [];
      this.Cc = -1
    }
    h = Xg.prototype;
    h.Cd = function (a) {
      var b = fb(this.Ea, function (b) {
        return b.Td === a
      });
      z(0 <= b, "removeWrite called with nonexistent writeId.");
      var c = this.Ea[b];
      this.Ea.splice(b, 1);
      for (var d = c.visible, e = !1, f = this.Ea.length - 1; d && 0 <= f;) {
        var g = this.Ea[f];
        g.visible && (f >= b && Yg(g, c.path) ? d = !1 : c.path.contains(g.path) && (e = !0));
        f--
      }
      if (d) {
        if (e) this.V = Zg(this.Ea, $g, M), this.Cc = 0 < this.Ea.length ? this.Ea[this.Ea.length - 1].Td : -1;
        else if (c.Na) this.V = this.V.Cd(c.path);
        else {
          var k = this;
          w(c.children, function (a, b) {
            k.V = k.V.Cd(c.path.u(b))
          })
        }
        return c.path
      }
      return null
    };
    h.ya = function (a, b, c, d) {
      if (c || d) {
        var e = Vg(this.V, a);
        return !d && e.f() ? b : d || null != b || null != Tg(e, M) ? (e = Zg(this.Ea, function (b) {
          return (b.visible || d) && (!c || !(0 <= $a(c, b.Td))) && (b.path.contains(a) || a.contains(b.path))
        }, a), b = b || Q, e.apply(b)) : null
      }
      e = Tg(this.V, a);
      if (null != e) return e;
      e = Vg(this.V, a);
      return e.f() ? b : null != b || null != Tg(e, M) ? (b = b || Q, e.apply(b)) : null
    };
    h.sc = function (a, b) {
      var c = Q,
        d = Tg(this.V, a);
      if (d) d.R() || d.W(R, function (a, b) {
        c = c.T(a, b)
      });
      else if (b) {
        var e = Vg(this.V, a);
        b.W(R, function (a, b) {
          var d = Vg(e, new H(a)).apply(b);
          c = c.T(a, d)
        });
        ta(Ug(e), function (a) {
          c = c.T(a.name, a.node)
        })
      } else e = Vg(this.V, a), ta(Ug(e), function (a) {
        c = c.T(a.name, a.node)
      });
      return c
    };
    h.Wc = function (a, b, c, d) {
      z(c || d, "Either existingEventSnap or existingServerSnap must exist");
      a = a.u(b);
      if (null != Tg(this.V, a)) return null;
      a = Vg(this.V, a);
      return a.f() ? d.sa(b) : a.apply(d.sa(b))
    };
    h.Za = function (a, b, c) {
      a = a.u(b);
      var d = Tg(this.V, a);
      return null != d ? d : fg(c, b) ? Vg(this.V, a).apply(c.j().P(b)) : null
    };
    h.mc = function (a) {
      return Tg(this.V, a)
    };
    h.Xd = function (a, b, c, d, e, f) {
      var g;
      a = Vg(this.V, a);
      g = Tg(a, M);
      if (null == g)
        if (null != b) g = a.apply(b);
        else return [];
      g = g.pb(f);
      if (g.f() || g.R()) return [];
      b = [];
      a = Xd(f);
      e = e ? g.Zb(c, f) : g.Xb(c, f);
      for (f = S(e); f && b.length < d;) 0 !== a(f, c) && b.push(f), f = S(e);
      return b
    };

    function Yg(a, b) {
      return a.Na ? a.path.contains(b) : !!ub(a.children, function (c, d) {
        return a.path.u(d).contains(b)
      })
    }

    function $g(a) {
      return a.visible
    }

    function Zg(a, b, c) {
      for (var d = Qg, e = 0; e < a.length; ++e) {
        var f = a[e];
        if (b(f)) {
          var g = f.path;
          if (f.Na) c.contains(g) ? (g = I(c, g), d = Rg(d, g, f.Na)) : g.contains(c) && (g = I(g, c), d = Rg(d, M, f.Na.sa(g)));
          else if (f.children)
            if (c.contains(g)) g = I(c, g), d = Sg(d, g, f.children);
            else {
              if (g.contains(c))
                if (g = I(g, c), g.f()) d = Sg(d, M, f.children);
                else if (f = t(f.children, J(g))) f = f.sa(K(g)), d = Rg(d, M, f)
            }
          else throw pc("WriteRecord should have .snap or .children");
        }
      }
      return d
    }

    function ah(a, b) {
      this.Jb = a;
      this.$ = b
    }
    h = ah.prototype;
    h.ya = function (a, b, c) {
      return this.$.ya(this.Jb, a, b, c)
    };
    h.sc = function (a) {
      return this.$.sc(this.Jb, a)
    };
    h.Wc = function (a, b, c) {
      return this.$.Wc(this.Jb, a, b, c)
    };
    h.mc = function (a) {
      return this.$.mc(this.Jb.u(a))
    };
    h.Xd = function (a, b, c, d, e) {
      return this.$.Xd(this.Jb, a, b, c, d, e)
    };
    h.Za = function (a, b) {
      return this.$.Za(this.Jb, a, b)
    };
    h.u = function (a) {
      return new ah(this.Jb.u(a), this.$)
    };

    function bh(a) {
      this.wa = Sf;
      this.Eb = new Xg;
      this.Ce = {};
      this.jc = {};
      this.Dc = a
    }

    function ch(a, b, c, d, e) {
      var f = a.Eb,
        g = e;
      z(d > f.Cc, "Stacking an older write on top of newer ones");
      p(g) || (g = !0);
      f.Ea.push({
        path: b,
        Na: c,
        Td: d,
        visible: g
      });
      g && (f.V = Rg(f.V, b, c));
      f.Cc = d;
      return e ? dh(a, new Jf(Gf, b, c)) : []
    }

    function eh(a, b, c, d) {
      var e = a.Eb;
      z(d > e.Cc, "Stacking an older merge on top of newer ones");
      e.Ea.push({
        path: b,
        children: c,
        Td: d,
        visible: !0
      });
      e.V = Sg(e.V, b, c);
      e.Cc = d;
      c = Rf(c);
      return dh(a, new Hf(Gf, b, c))
    }

    function fh(a, b, c) {
      c = c || !1;
      b = a.Eb.Cd(b);
      return null == b ? [] : dh(a, new Ef(b, c))
    }

    function gh(a, b, c) {
      c = Rf(c);
      return dh(a, new Hf(Of, b, c))
    }

    function hh(a, b, c, d) {
      d = ih(a, d);
      if (null != d) {
        var e = jh(d);
        d = e.path;
        e = e.Fb;
        b = I(d, b);
        c = new Jf(new Nf(!1, !0, e, !0), b, c);
        return kh(a, d, c)
      }
      return []
    }

    function lh(a, b, c, d) {
      if (d = ih(a, d)) {
        var e = jh(d);
        d = e.path;
        e = e.Fb;
        b = I(d, b);
        c = Rf(c);
        c = new Hf(new Nf(!1, !0, e, !0), b, c);
        return kh(a, d, c)
      }
      return []
    }
    bh.prototype.Lb = function (a, b) {
      var c = a.path,
        d = null,
        e = !1;
      $f(this.wa, c, function (a, b) {
        var f = I(a, c);
        d = b.mb(f);
        e = e || null != Mg(b);
        return !d
      });
      var f = this.wa.get(c);
      f ? (e = e || null != Mg(f), d = d || f.mb(M)) : (f = new Lg, this.wa = this.wa.set(c, f));
      var g;
      null != d ? g = !0 : (g = !1, d = Q, dg(this.wa.subtree(c), function (a, b) {
        var c = b.mb(M);
        c && (d = d.T(a, c))
      }));
      var k = null != Og(f, a);
      if (!k && !uf(a.B)) {
        var l = mh(a);
        z(!sb(this.jc, l), "View does not exist, but we have a tag");
        var m = nh++;
        this.jc[l] = m;
        this.Ce["_" + m] = l
      }
      g = f.Lb(a, b, new ah(c, this.Eb), d,
        g);
      k || e || (f = Og(f, a), g = g.concat(oh(this, a, f)));
      return g
    };
    bh.prototype.nb = function (a, b, c) {
      var d = a.path,
        e = this.wa.get(d),
        f = [];
      if (e && ("default" === ff(a) || null != Og(e, a))) {
        f = e.nb(a, b, c);
        e.f() && (this.wa = this.wa.remove(d));
        e = f.pg;
        f = f.Sf;
        b = -1 !== fb(e, function (a) {
          return uf(a.B)
        });
        var g = Yf(this.wa, d, function (a, b) {
          return null != Mg(b)
        });
        if (b && !g && (d = this.wa.subtree(d), !d.f()))
          for (var d = ph(d), k = 0; k < d.length; ++k) {
            var l = d[k],
              m = l.X,
              l = qh(this, l);
            this.Dc.ye(m, rh(this, m), l.hd, l.N)
          }
        if (!g && 0 < e.length && !c)
          if (b) this.Dc.Ld(a, null);
          else {
            var L = this;
            ta(e, function (a) {
              ff(a);
              var b = L.jc[mh(a)];
              L.Dc.Ld(a, b)
            })
          } sh(this, e)
      }
      return f
    };
    bh.prototype.ya = function (a, b) {
      var c = this.Eb,
        d = Yf(this.wa, a, function (b, c) {
          var d = I(b, a);
          if (d = c.mb(d)) return d
        });
      return c.ya(a, d, b, !0)
    };

    function ph(a) {
      return Wf(a, function (a, c, d) {
        if (c && null != Mg(c)) return [Mg(c)];
        var b = [];
        c && (b = Ng(c));
        w(d, function (a) {
          b = b.concat(a)
        });
        return b
      })
    }

    function sh(a, b) {
      for (var c = 0; c < b.length; ++c) {
        var d = b[c];
        if (!uf(d.B)) {
          var d = mh(d),
            e = a.jc[d];
          delete a.jc[d];
          delete a.Ce["_" + e]
        }
      }
    }

    function oh(a, b, c) {
      var d = b.path,
        e = rh(a, b);
      c = qh(a, c);
      b = a.Dc.ye(b, e, c.hd, c.N);
      d = a.wa.subtree(d);
      if (e) z(null == Mg(d.value), "If we're adding a query, it shouldn't be shadowed");
      else
        for (e = Wf(d, function (a, b, c) {
            if (!a.f() && b && null != Mg(b)) return [Mg(b).X];
            var d = [];
            b && (d = d.concat(bb(Ng(b), function (a) {
              return a.X
            })));
            w(c, function (a) {
              d = d.concat(a)
            });
            return d
          }), d = 0; d < e.length; ++d) c = e[d], a.Dc.Ld(c, rh(a, c));
      return b
    }

    function qh(a, b) {
      var c = b.X,
        d = rh(a, c);
      return {
        hd: function () {
          return (b.C() || Q).hash()
        },
        N: function (b) {
          if ("ok" === b) {
            if (d) {
              var e = c.path;
              if (b = ih(a, d)) {
                var g = jh(b);
                b = g.path;
                g = g.Fb;
                e = I(b, e);
                e = new Lf(new Nf(!1, !0, g, !0), e);
                b = kh(a, b, e)
              } else b = []
            } else b = dh(a, new Lf(Of, c.path));
            return b
          }
          switch (b) {
            case "too_big":
              e = "The data requested exceeds the maximum size,that can be accessed with a single request.";
              break;
            case "limits_exceeded":
              e = "The request is refused by server side because of the resource limit of your APP plan.";
              break;
            case "permission_denied":
              e = "Client doesn't have permission to access the desired data.";
              break;
            case "unavailable":
              e = "The service is unavailable";
              break;
            default:
              e = "Unknown error."
          }
          e = Error(b + ": " + e);
          e.code = b.toUpperCase();
          return a.nb(c, null, e)
        }
      }
    }

    function mh(a) {
      return a.path.toString() + "$" + ff(a)
    }

    function jh(a) {
      var b = a.indexOf("$");
      z(-1 !== b && b < a.length - 1, "Bad queryKey.");
      return {
        Fb: a.substr(b + 1),
        path: new H(a.substr(0, b))
      }
    }

    function ih(a, b) {
      var c = a.Ce,
        d = "_" + b;
      return null !== c && d in c ? c[d] : void 0
    }

    function rh(a, b) {
      var c = mh(b);
      return t(a.jc, c)
    }
    var nh = 1;

    function kh(a, b, c) {
      var d = a.wa.get(b);
      z(d, "Missing sync point for query tag that we're tracking");
      return d.fb(c, new ah(b, a.Eb), null)
    }

    function dh(a, b) {
      return th(a, b, a.wa, null, new ah(M, a.Eb))
    }

    function th(a, b, c, d, e) {
      if (b.path.f()) return uh(a, b, c, d, e);
      var f = c.get(M);
      null == d && null != f && (d = f.mb(M));
      var g = [],
        k = J(b.path),
        l = b.Nc(k);
      if ((c = c.children.get(k)) && l) var m = d ? d.P(k) : null,
        k = e.u(k),
        g = g.concat(th(a, l, c, m, k));
      f && (g = g.concat(f.fb(b, e, d)));
      return g
    }

    function uh(a, b, c, d, e) {
      var f = c.get(M);
      null == d && null != f && (d = f.mb(M));
      var g = [];
      c.children.na(function (c, f) {
        var k = d ? d.P(c) : null,
          l = e.u(c),
          A = b.Nc(c);
        A && (g = g.concat(uh(a, A, f, k, l)))
      });
      f && (g = g.concat(f.fb(b, e, d)));
      return g
    };

    function vh() {
      this.vc = {}
    }
    vh.prototype.get = function () {
      return xb(this.vc)
    };

    function wh(a) {
      this.Jf = a;
      this.od = null
    }
    wh.prototype.get = function () {
      var a = this.Jf.get(),
        b = xb(a);
      if (this.od)
        for (var c in this.od) b[c] -= this.od[c];
      this.od = a;
      return b
    };

    function xh(a, b) {
      this.uf = {};
      this.Jd = new wh(a);
      this.ka = b;
      var c = 1E4 + 2E4 * Math.random();
      setTimeout(r(this.nf, this), Math.floor(c))
    }
    xh.prototype.nf = function () {
      var a = this.Jd.get(),
        b = {},
        c = !1,
        d;
      for (d in a) 0 < a[d] && pa(this.uf, d) && (b[d] = a[d], c = !0);
      c && this.ka.ve(b);
      setTimeout(r(this.nf, this), Math.floor(6E5 * Math.random()))
    };
    var yh = {},
      zh = {};

    function Ah(a) {
      a = a.toString();
      yh[a] || (yh[a] = new vh);
      return yh[a]
    }

    function Bh(a, b) {
      var c = a.toString();
      zh[c] || (zh[c] = b());
      return zh[c]
    };

    function Ch(a, b) {
      return a && "object" === typeof a ? (z(".sv" in a, "Unexpected leaf node or priority contents"), b[a[".sv"]]) : a
    }

    function Dh(a, b) {
      var c = new Af;
      Df(a, new H(""), function (a, e) {
        Bf(c, a, Eh(e, b))
      });
      return c
    }

    function Eh(a, b) {
      var c = a.G().O(),
        c = Ch(c, b),
        d;
      if (a.R()) {
        var e = Ch(a.Ha(), b);
        return e !== a.Ha() || c !== a.G().O() ? new ae(e, P(c)) : a
      }
      d = a;
      c !== a.G().O() && (d = d.ga(new ae(c)));
      a.W(R, function (a, c) {
        var e = Eh(c, b);
        e !== c && (d = d.T(a, e))
      });
      return d
    };

    function Fh() {
      this.children = {};
      this.Yc = 0;
      this.value = null
    }

    function Gh(a, b, c) {
      this.sd = a ? a : "";
      this.Ba = b ? b : null;
      this.H = c ? c : new Fh
    }

    function Hh(a, b) {
      for (var c = b instanceof H ? b : new H(b), d = a, e; null !== (e = J(c));) var f = t(d.H.children, e) || new Fh,
        d = new Gh(e, d, f),
        c = K(c);
      return d
    }
    h = Gh.prototype;
    h.Ha = function () {
      return this.H.value
    };

    function Ih(a, b) {
      z("undefined" !== typeof b, "Cannot set value to undefined");
      a.H.value = b;
      Jh(a)
    }
    h.clear = function () {
      this.H.value = null;
      this.H.children = {};
      this.H.Yc = 0;
      Jh(this)
    };
    h.gd = function () {
      return 0 < this.H.Yc
    };
    h.f = function () {
      return null === this.Ha() && !this.gd()
    };
    h.W = function (a) {
      var b = this;
      w(this.H.children, function (c, d) {
        a(new Gh(d, b, c))
      })
    };

    function Kh(a, b, c, d) {
      c && !d && b(a);
      a.W(function (a) {
        Kh(a, b, !0, d)
      });
      c && d && b(a)
    }

    function Lh(a, b) {
      for (var c = a.parent(); null !== c && !b(c);) c = c.parent()
    }
    h.path = function () {
      return new H(null === this.Ba ? this.sd : this.Ba.path() + "/" + this.sd)
    };
    h.name = function () {
      return this.sd
    };
    h.parent = function () {
      return this.Ba
    };

    function Jh(a) {
      if (null !== a.Ba) {
        var b = a.Ba,
          c = a.sd,
          d = a.f(),
          e = pa(b.H.children, c);
        d && e ? (delete b.H.children[c], b.H.Yc--, Jh(b)) : d || e || (b.H.children[c] = a.H, b.H.Yc++, Jh(b))
      }
    };

    function Mh() {
      this.ub = []
    }

    function Nh(a, b) {
      for (var c = null, d = 0; d < b.length; d++) {
        var e = b[d],
          f = e.Yb();
        null === c || f.da(c.Yb()) || (a.ub.push(c), c = null);
        null === c && (c = new Oh(f));
        c.add(e)
      }
      c && a.ub.push(c)
    }

    function Ph(a, b, c) {
      Nh(a, c);
      Qh(a, function (a) {
        return a.da(b)
      })
    }

    function Rh(a, b, c) {
      Nh(a, c);
      Qh(a, function (a) {
        return a.contains(b) || b.contains(a)
      })
    }

    function Qh(a, b) {
      for (var c = !0, d = 0; d < a.ub.length; d++) {
        var e = a.ub[d];
        if (e)
          if (e = e.Yb(), b(e)) {
            for (var e = a.ub[d], f = 0; f < e.ed.length; f++) {
              var g = e.ed[f];
              if (null !== g) {
                e.ed[f] = null;
                var k = g.Tb();
                tc && Ra("event: " + g.toString());
                Fc(k)
              }
            }
            a.ub[d] = null
          } else c = !1
      }
      c && (a.ub = [])
    }

    function Oh(a) {
      this.ua = a;
      this.ed = []
    }
    Oh.prototype.add = function (a) {
      this.ed.push(a)
    };
    Oh.prototype.Yb = function () {
      return this.ua
    };

    function Sh(a, b, c) {
      this.F = b;
      this.la = a;
      this.Kd = Ah(b);
      this.ha = new Mh;
      this.td = 1;
      this.ka = this.bb = null;
      c || 0 <= ("object" === typeof window && window.navigator && window.navigator.userAgent || "").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) ? (this.ka = new sf(this.F, r(this.Cb, this)), setTimeout(r(this.Jc, this, !0), 0)) : this.ka = this.bb = new bf(this.F, r(this.Cb, this), r(this.Jc, this), r(this.se, this));
      this.Ig = Bh(b, r(function () {
        return new xh(this.Kd, this.ka)
      }, this));
      this.nc =
        new Gh;
      this.je = new xf;
      var d = this;
      this.nd = new bh({
        ye: function (a, b, c, k) {
          b = [];
          c = d.je.j(a.path);
          c.f() || (b = dh(d.nd, new Jf(Of, a.path, c)), setTimeout(function () {
            k("ok")
          }, 0));
          return b
        },
        Ld: aa
      });
      this.la.bind(this.la.qb.gb, function (a) {
        a && a.signIn ? d.ka.Vd(a.idToken, function (b, c) {
          d.Nb(b, c, a)
        }, function (a, b) {
          Th(d, a, b)
        }) : d.ka.wf(function (a, b) {
          Th(d, a, b)
        })
      });
      Uh(this, "connected", !1);
      this.Aa = new Af;
      this.cd = 0;
      this.ke = null;
      this.S = new bh({
        ye: function (a, b, c, k) {
          d.ka.Ze(a, c, b, function (b, c) {
            var e = k(b, c);
            Rh(d.ha, a.path, e)
          });
          return []
        },
        Ld: function (a, b) {
          d.ka.xf(a, b)
        }
      })
    }
    h = Sh.prototype;
    h.Nb = function () {
      this.Bb(!0)
    };

    function Th(a, b, c) {
      a.Bb(!1);
      "expired_token" == b && a.la.emit(a.la.qb.Ie, {
        status: b,
        reason: c
      })
    }
    h.toString = function () {
      return (this.F.Hb ? "https://" : "http://") + this.F.host
    };
    h.name = function () {
      return this.F.pe
    };

    function Vh(a) {
      a = a.je.j(new H(".info/serverTimeOffset")).O() || 0;
      return (new Date).getTime() + a
    }

    function Wh(a) {
      a = a = {
        timestamp: Vh(a)
      };
      a.timestamp = a.timestamp || (new Date).getTime();
      return a
    }
    h.Cb = function (a, b, c, d) {
      this.cd++;
      var e = new H(a);
      b = this.ke ? this.ke(a, b) : b;
      a = [];
      d ? c ? (b = mb(b, function (a) {
        return P(a)
      }), a = lh(this.S, e, b, d)) : (b = P(b), a = hh(this.S, e, b, d)) : c ? (d = mb(b, function (a) {
        return P(a)
      }), a = gh(this.S, e, d)) : (d = P(b), a = dh(this.S, new Jf(Of, e, d)));
      d = e;
      0 < a.length && (d = Xh(this, e));
      Rh(this.ha, d, a)
    };
    h.Jc = function (a) {
      Uh(this, "connected", a);
      !1 === a && Yh(this)
    };
    h.se = function (a) {
      var b = this;
      Cc(a, function (a, d) {
        Uh(b, d, a)
      })
    };
    h.Bb = function (a) {
      Uh(this, "authenticated", a)
    };

    function Uh(a, b, c) {
      b = new H("/.info/" + b);
      c = P(c);
      var d = a.je;
      d.Gd = d.Gd.K(b, c);
      c = dh(a.nd, new Jf(Of, b, c));
      Rh(a.ha, b, c)
    }
    h.ob = function (a, b, c, d) {
      this.o("set", {
        path: a.toString(),
        value: b,
        bh: c
      });
      var e = Wh(this);
      b = P(b, c);
      var e = Eh(b, e),
        f = this.td++,
        e = ch(this.S, a, e, f, !0);
      Nh(this.ha, e);
      var g = this;
      this.ka.put(a.toString(), b.O(!0), function (b, c) {
        var e = "ok" === b;
        e || B("set at " + a + " failed: " + b);
        e = fh(g.S, f, !e);
        Rh(g.ha, a, e);
        Zh(d, b, c)
      });
      e = $h(this, a);
      Xh(this, e);
      Rh(this.ha, e, [])
    };
    h.update = function (a, b, c) {
      this.o("update", {
        path: a.toString(),
        value: b
      });
      var d = !0,
        e = Wh(this),
        f = {};
      w(b, function (a, b) {
        d = !1;
        var c = P(a);
        f[b] = Eh(c, e)
      });
      if (d) Ra("update() called with empty data.  Don't do anything."), Zh(c, "ok");
      else {
        var g = this.td++,
          k = eh(this.S, a, f, g);
        Nh(this.ha, k);
        var l = this;
        this.ka.af(a.toString(), b, function (b, d) {
          var e = "ok" === b;
          e || B("update at " + a + " failed: " + b);
          var e = fh(l.S, g, !e),
            f = a;
          0 < e.length && (f = Xh(l, a));
          Rh(l.ha, f, e);
          Zh(c, b, d)
        });
        b = $h(this, a);
        Xh(this, b);
        Rh(this.ha, a, [])
      }
    };

    function Yh(a) {
      a.o("onDisconnectEvents");
      var b = Wh(a),
        c = [];
      Df(Dh(a.Aa, b), M, function (b, e) {
        c = c.concat(dh(a.S, new Jf(Of, b, e)));
        var d = $h(a, b);
        Xh(a, d)
      });
      a.Aa = new Af;
      Rh(a.ha, M, c)
    }
    h.vd = function (a, b) {
      var c = this;
      this.ka.vd(a.toString(), function (d, e) {
        "ok" === d && Cf(c.Aa, a);
        Zh(b, d, e)
      })
    };

    function ai(a, b, c, d) {
      var e = P(c);
      a.ka.re(b.toString(), e.O(!0), function (c, g) {
        "ok" === c && Bf(a.Aa, b, e);
        Zh(d, c, g)
      })
    }

    function bi(a, b, c, d, e) {
      var f = P(c, d);
      a.ka.re(b.toString(), f.O(!0), function (c, d) {
        "ok" === c && Bf(a.Aa, b, f);
        Zh(e, c, d)
      })
    }

    function ci(a, b, c, d) {
      var e = !0,
        f;
      for (f in c) e = !1;
      e ? (Ra("onDisconnect().update() called with empty data.  Don't do anything."), Zh(d, "ok")) : a.ka.cf(b.toString(), c, function (e, f) {
        if ("ok" === e)
          for (var g in c)
            if (c.hasOwnProperty(g)) {
              var k = P(c[g]);
              Bf(a.Aa, b.u(g), k)
            } Zh(d, e, f)
      })
    }

    function di(a, b, c) {
      c = ".info" === J(b.path) ? a.nd.Lb(b, c) : a.S.Lb(b, c);
      Ph(a.ha, b.path, c)
    }
    h.yc = function () {
      this.bb && this.bb.yc()
    };
    h.resume = function () {
      this.bb && this.bb.resume()
    };
    h.ze = function (a) {
      if ("undefined" !== typeof console) {
        a ? (this.Jd || (this.Jd = new wh(this.Kd)), a = this.Jd.get()) : a = this.Kd.get();
        var b = cb(rb(a), function (a, b) {
            return Math.max(b.length, a)
          }, 0),
          c;
        for (c in a)
          if (a.hasOwnProperty(c)) {
            for (var d = a[c], e = c.length; e < b + 2; e++) c += " ";
            console.log(c + d)
          }
      }
    };
    h.Ae = function (a) {
      var b = this.Kd,
        c;
      p(c) || (c = 1);
      pa(b.vc, a) || (b.vc[a] = 0);
      b.vc[a] += c;
      this.Ig.uf[a] = !0
    };
    h.o = function (a) {
      var b = "";
      this.bb && (b = this.bb.id + ":");
      Ra(b, arguments)
    };

    function Zh(a, b, c) {
      a && Fc(function () {
        if ("ok" == b) a(null);
        else {
          var d = (b || "error").toUpperCase(),
            e = d;
          c && (e += ": " + c);
          e = Error(e);
          e.code = d;
          a(e)
        }
      })
    };

    function ei(a, b, c, d, e) {
      this.host = a.toLowerCase();
      this.domain = this.host.substr(this.host.indexOf(".") + 1);
      this.Hb = b;
      this.pe = c;
      this.zd = e || "";
      fc.Sc ? (this.tf = !0, this.za = fc.Sc) : (this.za = (a = Ua.get("host:" + a)) && a.split(",ts:")[1] >= Date.now() - 72E5 ? a.split(",ts:")[0] : null, this.tf = !1);
      this.lb = JSON.parse(v.get("failHosts")) || []
    }
    ei.prototype.Xe = function () {
      return "wilddogio.com" !== this.domain && "wilddogio-demo.com" !== this.domain
    };

    function Ze(a, b) {
      fc.Sc || (null == b ? (a.za = a.host, "s-" === a.za.substr(0, 2) && Ua.remove("host:" + a.host)) : b !== a.za && 0 < b.indexOf(".wilddogio.com") && (a.za = b, "s-" === a.za.substr(0, 2) && Ua.set("host:" + a.host, a.za + ",ts:" + Date.now())))
    }
    ei.prototype.toString = function () {
      var a = (this.Hb ? "https://" : "http://") + this.host;
      this.zd && (a += "<" + this.zd + ">");
      return a
    };

    function $e(a, b) {
      if (!fc.Sc) {
        var c = a.lb.indexOf(b);
        0 <= c && (a.lb.splice(c, 1), v.set("failHosts", JSON.stringify(a.lb)))
      }
    };

    function fi(a, b, c, d, e) {
      function f() {}
      a.o("transaction on " + b);
      var g = new W(a.la, a, b);
      g.Ab("value", f);
      c = {
        path: b,
        update: c,
        N: d,
        status: null,
        order: oc(),
        He: e,
        rf: 0,
        Qd: function () {
          g.fc("value", f)
        },
        Ud: null,
        Fa: null,
        $c: null,
        ad: null,
        bd: null
      };
      d = a.S.ya(b, void 0) || Q;
      c.$c = d;
      d = c.update(d.O());
      if (p(d)) {
        Id("transaction failed: Data returned ", d, c.path);
        c.status = 1;
        e = Hh(a.nc, b);
        var k = e.Ha() || [];
        k.push(c);
        Ih(e, k);
        "object" === typeof d && null !== d && pa(d, ".priority") ? (k = t(d, ".priority"), z(Gd(k), "Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")) :
          k = (a.S.ya(b) || Q).G().O();
        e = Wh(a);
        d = P(d, k);
        e = Eh(d, e);
        c.ad = d;
        c.bd = e;
        c.Fa = a.td++;
        c = ch(a.S, b, e, c.Fa, c.He);
        Rh(a.ha, b, c);
        gi(a)
      } else c.Qd(), c.ad = null, c.bd = null, c.N && (a = new U(c.$c, new W(a.la, a, c.path), R), c.N(null, !1, a))
    }

    function gi(a, b) {
      var c = b || a.nc;
      b || hi(a, c);
      if (null !== c.Ha()) {
        var d = ii(a, c);
        z(0 < d.length, "Sending zero length transaction queue");
        db(d, function (a) {
          return 1 === a.status
        }) && ji(a, c.path(), d)
      } else c.gd() && c.W(function (b) {
        gi(a, b)
      })
    }

    function ji(a, b, c) {
      for (var d = bb(c, function (a) {
          return a.Fa
        }), e = a.S.ya(b, d) || Q, d = e, e = e.hash(), f = 0; f < c.length; f++) {
        var g = c[f];
        z(1 === g.status, "tryToSendTransactionQueue_: items in queue should all be run.");
        g.status = 2;
        g.rf++;
        var k = I(b, g.path),
          d = d.K(k, g.ad)
      }
      var d = d.O(!0),
        l = a.la;
      a.ka.put(b.toString(), d, function (d) {
        a.o("transaction put response", {
          path: b.toString(),
          status: d
        });
        var e = [];
        if ("ok" === d) {
          d = [];
          for (f = 0; f < c.length; f++) {
            c[f].status = 3;
            e = e.concat(fh(a.S, c[f].Fa));
            if (c[f].N) {
              var g = c[f].bd,
                k = new W(l, a,
                  c[f].path);
              d.push(r(c[f].N, null, null, !0, new U(g, k, R)))
            }
            c[f].Qd()
          }
          hi(a, Hh(a.nc, b));
          gi(a);
          Rh(a.ha, b, e);
          for (f = 0; f < d.length; f++) Fc(d[f])
        } else {
          if ("datastale" === d)
            for (f = 0; f < c.length; f++) c[f].status = 4 === c[f].status ? 5 : 1;
          else
            for (B("transaction at " + b.toString() + " failed: " + d), f = 0; f < c.length; f++) c[f].status = 5, c[f].Ud = d;
          Xh(a, b)
        }
      }, e)
    }

    function Xh(a, b) {
      var c = ki(a, b),
        d = c.path(),
        c = ii(a, c);
      li(a, c, d);
      return d
    }

    function li(a, b, c) {
      if (0 !== b.length) {
        for (var d = [], e = [], f = bb(b, function (a) {
            return a.Fa
          }), g = 0; g < b.length; g++) {
          var k = b[g],
            l = I(c, k.path),
            m = !1,
            L;
          z(null !== l, "rerunTransactionsUnderNode_: relativePath should not be null.");
          if (5 === k.status) m = !0, L = k.Ud, e = e.concat(fh(a.S, k.Fa, !0));
          else if (1 === k.status)
            if (25 <= k.rf) m = !0, L = "maxretry", e = e.concat(fh(a.S, k.Fa, !0));
            else {
              var A = a.S.ya(k.path, f) || Q;
              k.$c = A;
              var ca = b[g].update(A.O());
              p(ca) ? (Id("transaction failed: Data returned ", ca, k.path), l = P(ca), "object" === typeof ca &&
                null != ca && pa(ca, ".priority") || (l = l.ga(A.G())), A = k.Fa, ca = Wh(a), ca = Eh(l, ca), k.ad = l, k.bd = ca, k.Fa = a.td++, gb(f, A), e = e.concat(ch(a.S, k.path, ca, k.Fa, k.He)), e = e.concat(fh(a.S, A, !0))) : (m = !0, L = "nodata", e = e.concat(fh(a.S, k.Fa, !0)))
            } Rh(a.ha, c, e);
          e = [];
          m && (b[g].status = 3, setTimeout(b[g].Qd, Math.floor(0)), b[g].N && ("nodata" === L ? (k = new W(a.la, a, b[g].path), d.push(r(b[g].N, null, null, !1, new U(b[g].$c, k, R)))) : d.push(r(b[g].N, null, Error(L), !1, null))))
        }
        hi(a, a.nc);
        for (g = 0; g < d.length; g++) Fc(d[g]);
        gi(a)
      }
    }

    function ki(a, b) {
      for (var c, d = a.nc; null !== (c = J(b)) && null === d.Ha();) d = Hh(d, c), b = K(b);
      return d
    }

    function ii(a, b) {
      var c = [];
      mi(a, b, c);
      c.sort(function (a, b) {
        return a.order - b.order
      });
      return c
    }

    function mi(a, b, c) {
      var d = b.Ha();
      if (null !== d)
        for (var e = 0; e < d.length; e++) c.push(d[e]);
      b.W(function (b) {
        mi(a, b, c)
      })
    }

    function hi(a, b) {
      var c = b.Ha();
      if (c) {
        for (var d = 0, e = 0; e < c.length; e++) 3 !== c[e].status && (c[d] = c[e], d++);
        c.length = d;
        Ih(b, 0 < c.length ? c : null)
      }
      b.W(function (b) {
        hi(a, b)
      })
    }

    function $h(a, b) {
      var c = ki(a, b).path(),
        d = Hh(a.nc, b);
      Lh(d, function (b) {
        ni(a, b)
      });
      ni(a, d);
      Kh(d, function (b) {
        ni(a, b)
      });
      return c
    }

    function ni(a, b) {
      var c = b.Ha();
      if (null !== c) {
        for (var d = [], e = [], f = -1, g = 0; g < c.length; g++) 4 !== c[g].status && (2 === c[g].status ? (z(f === g - 1, "All SENT items should be at beginning of queue."), f = g, c[g].status = 4, c[g].Ud = "set") : (z(1 === c[g].status, "Unexpected transaction status in abort"), c[g].Qd(), e = e.concat(fh(a.S, c[g].Fa, !0)), c[g].N && d.push(r(c[g].N, null, Error("set"), !1, null)))); - 1 === f ? Ih(b, null) : c.length = f + 1;
        Rh(a.ha, b.path(), e);
        for (g = 0; g < d.length; g++) Fc(d[g])
      }
    };

    function oi() {
      this.Wa = {};
      this.Tg = !1
    }
    ba(oi);
    oi.prototype.yc = function (a) {
      for (var b in this.Wa[a.name]) this.Wa[a.name].hasOwnProperty(b) && this.Wa[a.name][b].yc()
    };
    oi.prototype.resume = function (a) {
      for (var b in this.Wa[a.name]) this.Wa[a.name].hasOwnProperty(b) && this.Wa[a.name][b].resume()
    };

    function pi(a) {
      var b = this;
      this.jb = a;
      this.Nd = "*";
      Na() ? this.Hc = this.kd = Ga() : (this.Hc = window.opener, this.kd = window);
      if (!b.Hc) throw "Unable to find relay frame";
      Ha(this.kd, "message", r(this.wd, this));
      Ha(this.kd, "message", r(this.bf, this));
      try {
        qi(this, {
          a: "ready"
        })
      } catch (c) {
        Ha(this.Hc, "load", function () {
          qi(b, {
            a: "ready"
          })
        })
      }
      Ha(window, "unload", r(this.kg, this))
    }

    function qi(a, b) {
      b = u(b);
      Na() ? a.Hc.doPost(b, a.Nd) : a.Hc.postMessage(b, a.Nd)
    }
    pi.prototype.wd = function (a) {
      var b = this,
        c;
      try {
        c = Ca(a.data)
      } catch (d) {}
      c && "request" === c.a && (Ia(window, this.wd), this.Nd = a.origin, this.jb && setTimeout(function () {
        b.jb(b.Nd, c.d, function (a, c) {
          b.Gf = !c;
          b.jb = void 0;
          qi(b, {
            a: "response",
            d: a,
            forceKeepWindowOpen: c
          })
        })
      }, 0))
    };
    pi.prototype.kg = function () {
      try {
        Ia(this.kd, this.bf)
      } catch (a) {}
      this.jb && (qi(this, {
        a: "error",
        d: "unknown closed window"
      }), this.jb = void 0);
      try {
        window.close()
      } catch (a) {}
    };
    pi.prototype.bf = function (a) {
      if (this.Gf && "die" === a.data) try {
        window.close()
      } catch (b) {}
    };
    var X = {
      Wf: function () {
        ma.mf.Vg.Vf();
        ma.mf.zf.$g()
      }
    };
    X.forceLongPolling = X.Wf;
    X.Xf = function () {
      ma.mf.zf.Vf()
    };
    X.forceWebSockets = X.Xf;
    X.yg = function (a, b) {
      a.D.bb.xe = b
    };
    X.setSecurityDebugCallback = X.yg;
    X.ze = function (a, b) {
      a.D.ze(b)
    };
    X.stats = X.ze;
    X.Ae = function (a, b) {
      a.D.Ae(b)
    };
    X.statsIncrementCounter = X.Ae;
    X.cd = function (a) {
      return a.D.cd
    };
    X.dataUpdateCount = X.cd;
    X.bg = function (a, b) {
      a.D.ke = b
    };
    X.interceptServerData = X.bg;
    X.ig = function (a) {
      new pi(a)
    };
    X.onPopupOpen = X.ig;
    X.wg = function (a) {
      Fa = a
    };
    X.setAuthenticationServer = X.wg;

    function Y(a, b) {
      this.Pc = a;
      this.ua = b
    }
    Y.prototype.cancel = function (a) {
      F("Wilddog.onDisconnect().cancel", 0, 1, arguments.length);
      G("Wilddog.onDisconnect().cancel", 1, a, !0);
      var b = new x;
      this.Pc.vd(this.ua, y(b, a));
      return b.m
    };
    Y.prototype.cancel = Y.prototype.cancel;
    Y.prototype.cancel = Y.prototype.cancel;
    Y.prototype.remove = function (a) {
      F("Wilddog.onDisconnect().remove", 0, 1, arguments.length);
      Qd("Wilddog.onDisconnect().remove", this.ua);
      G("Wilddog.onDisconnect().remove", 1, a, !0);
      var b = new x;
      ai(this.Pc, this.ua, null, y(b, a));
      return b.m
    };
    Y.prototype.remove = Y.prototype.remove;
    Y.prototype.remove = Y.prototype.remove;
    Y.prototype.set = function (a, b) {
      F("Wilddog.onDisconnect().set", 1, 2, arguments.length);
      Qd("Wilddog.onDisconnect().set", this.ua);
      Hd("Wilddog.onDisconnect().set", a, this.ua, !1);
      G("Wilddog.onDisconnect().set", 2, b, !0);
      var c = new x;
      ai(this.Pc, this.ua, a, y(c, b));
      return c.m
    };
    Y.prototype.set = Y.prototype.set;
    Y.prototype.set = Y.prototype.set;
    Y.prototype.ob = function (a, b, c) {
      F("Wilddog.onDisconnect().setWithPriority", 2, 3, arguments.length);
      Qd("Wilddog.onDisconnect().setWithPriority", this.ua);
      Hd("Wilddog.onDisconnect().setWithPriority", a, this.ua, !1);
      Ld("Wilddog.onDisconnect().setWithPriority", 2, b);
      G("Wilddog.onDisconnect().setWithPriority", 3, c, !0);
      var d = new x;
      bi(this.Pc, this.ua, a, b, y(d, c));
      return d.m
    };
    Y.prototype.setWithPriority = Y.prototype.ob;
    Y.prototype.setWithPriority = Y.prototype.ob;
    Y.prototype.update = function (a, b) {
      F("Wilddog.onDisconnect().update", 1, 2, arguments.length);
      Qd("Wilddog.onDisconnect().update", this.ua);
      if (ea(a)) {
        for (var c = {}, d = 0; d < a.length; ++d) c["" + d] = a[d];
        a = c;
        B("Passing an Array to Wilddog.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")
      }
      Kd("Wilddog.onDisconnect().update", a, this.ua);
      G("Wilddog.onDisconnect().update", 2, b, !0);
      c = new x;
      ci(this.Pc, this.ua, a, y(c, b));
      return c.m
    };
    Y.prototype.update = Y.prototype.update;
    Y.prototype.update = Y.prototype.update;

    function Gg(a) {
      this.g = a
    }
    h = Gg.prototype;
    h.K = function (a, b, c, d, e) {
      z(a.Ac(this.g), "A node must be indexed if only a child is updated");
      d = a.P(b);
      if (d.da(c)) return a;
      null != e && (c.f() ? a.Ma(b) ? ri(e, new V("child_removed", d, b)) : z(a.R(), "A child remove without an old child only makes sense on a leaf node") : d.f() ? ri(e, new V("child_added", c, b)) : ri(e, new V("child_changed", c, b, d)));
      return a.R() && c.f() ? a : a.T(b, c).pb(this.g)
    };
    h.xa = function (a, b, c) {
      null != c && (a.R() || a.W(R, function (a, e) {
        b.Ma(a) || ri(c, new V("child_removed", e, a))
      }), b.R() || b.W(R, function (b, e) {
        if (a.Ma(b)) {
          var d = a.P(b);
          d.da(e) || ri(c, new V("child_changed", e, b, d))
        } else ri(c, new V("child_added", e, b))
      }));
      return b.pb(this.g)
    };
    h.ga = function (a, b) {
      return a.f() ? Q : a.ga(b)
    };
    h.La = function () {
      return !1
    };
    h.Ub = function () {
      return this
    };

    function Ig(a) {
      this.ie = new Gg(a.g);
      this.g = a.g;
      var b;
      a.pa ? (b = si(a), b = a.g.Fc(ti(a), b)) : b = Je;
      this.Rc = b;
      a.ra ? (b = ui(a), a = a.g.Fc(vi(a), b)) : a = a.g.Gc();
      this.xc = a
    }
    h = Ig.prototype;
    h.matches = function (a) {
      return 0 >= this.g.compare(this.Rc, a) && 0 >= this.g.compare(a, this.xc)
    };
    h.K = function (a, b, c, d, e) {
      this.matches(new O(b, c)) || (c = Q);
      return this.ie.K(a, b, c, d, e)
    };
    h.xa = function (a, b, c) {
      b.R() && (b = Q);
      var d = b.pb(this.g),
        d = d.ga(Q),
        e = this;
      b.W(R, function (a, b) {
        e.matches(new O(a, b)) || (d = d.T(a, Q))
      });
      return this.ie.xa(a, d, c)
    };
    h.ga = function (a) {
      return a
    };
    h.La = function () {
      return !0
    };
    h.Ub = function () {
      return this.ie
    };

    function Hg(a) {
      this.va = new Ig(a);
      this.g = a.g;
      z(a.oa, "Only valid if limit has been set");
      this.ea = a.ea;
      this.Gb = !wi(a)
    }
    h = Hg.prototype;
    h.K = function (a, b, c, d, e) {
      this.va.matches(new O(b, c)) || (c = Q);
      return a.P(b).da(c) ? a : a.zb() < this.ea ? this.va.Ub().K(a, b, c, d, e) : xi(this, a, b, c, d, e)
    };
    h.xa = function (a, b, c) {
      var d;
      if (b.R() || b.f()) d = Q.pb(this.g);
      else if (2 * this.ea < b.zb() && b.Ac(this.g)) {
        d = Q.pb(this.g);
        b = this.Gb ? b.Zb(this.va.xc, this.g) : b.Xb(this.va.Rc, this.g);
        for (var e = 0; 0 < b.Ta.length && e < this.ea;) {
          var f = S(b),
            g;
          if (g = this.Gb ? 0 >= this.g.compare(this.va.Rc, f) : 0 >= this.g.compare(f, this.va.xc)) d = d.T(f.name, f.node), e++;
          else break
        }
      } else {
        d = b.pb(this.g);
        d = d.ga(Q);
        var k, l, m;
        if (this.Gb) {
          b = d.Ue(this.g);
          k = this.va.xc;
          l = this.va.Rc;
          var L = Xd(this.g);
          m = function (a, b) {
            return L(b, a)
          }
        } else b = d.Wb(this.g), k = this.va.Rc,
          l = this.va.xc, m = Xd(this.g);
        for (var e = 0, A = !1; 0 < b.Ta.length;) f = S(b), !A && 0 >= m(k, f) && (A = !0), (g = A && e < this.ea && 0 >= m(f, l)) ? e++ : d = d.T(f.name, Q)
      }
      return this.va.Ub().xa(a, d, c)
    };
    h.ga = function (a) {
      return a
    };
    h.La = function () {
      return !0
    };
    h.Ub = function () {
      return this.va.Ub()
    };

    function xi(a, b, c, d, e, f) {
      var g;
      if (a.Gb) {
        var k = Xd(a.g);
        g = function (a, b) {
          return k(b, a)
        }
      } else g = Xd(a.g);
      z(b.zb() == a.ea, "");
      var l = new O(c, d),
        m = a.Gb ? He(b, a.g) : Ie(b, a.g),
        L = a.va.matches(l);
      if (b.Ma(c)) {
        var A = b.P(c),
          m = e.ee(a.g, m, a.Gb);
        null != m && m.name == c && (m = e.ee(a.g, m, a.Gb));
        e = null == m ? 1 : g(m, l);
        if (L && !d.f() && 0 <= e) return null != f && ri(f, new V("child_changed", d, c, A)), b.T(c, d);
        null != f && ri(f, new V("child_removed", A, c));
        b = b.T(c, Q);
        return null != m && a.va.matches(m) ? (null != f && ri(f, new V("child_added", m.node, m.name)), b.T(m.name,
          m.node)) : b
      }
      return d.f() ? b : L && 0 <= g(m, l) ? (null != f && (ri(f, new V("child_removed", m.node, m.name)), ri(f, new V("child_added", d, c))), b.T(c, d).T(m.name, Q)) : b
    };

    function xg() {
      this.kb = {}
    }

    function ri(a, b) {
      var c = b.type,
        d = b.$a;
      z("child_added" == c || "child_changed" == c || "child_removed" == c, "Only child changes supported for tracking");
      z(".priority" !== d, "Only non-priority child changes can be tracked.");
      var e = t(a.kb, d);
      if (e) {
        var f = e.type;
        if ("child_added" == c && "child_removed" == f) a.kb[d] = new V("child_changed", b.Oa, d, e.Oa);
        else if ("child_removed" == c && "child_added" == f) delete a.kb[d];
        else if ("child_removed" == c && "child_changed" == f) a.kb[d] = new V("child_removed", e.qe, d);
        else if ("child_changed" == c &&
          "child_added" == f) a.kb[d] = new V("child_added", b.Oa, d);
        else if ("child_changed" == c && "child_changed" == f) a.kb[d] = new V("child_changed", b.Oa, d, e.qe);
        else throw pc("Illegal combination of changes: " + b + " occurred after " + e);
      } else a.kb[d] = b
    };

    function yi() {
      this.Qb = this.ra = this.Ib = this.pa = this.oa = !1;
      this.ea = 0;
      this.Kb = "";
      this.dc = null;
      this.xb = "";
      this.ac = null;
      this.vb = "";
      this.g = R
    }
    var zi = new yi;

    function wi(a) {
      return "" === a.Kb ? a.pa : "l" === a.Kb
    }

    function ti(a) {
      z(a.pa, "Only valid if start has been set");
      return a.dc
    }

    function si(a) {
      z(a.pa, "Only valid if start has been set");
      return a.Ib ? a.xb : "[MIN_NAME]"
    }

    function vi(a) {
      z(a.ra, "Only valid if end has been set");
      return a.ac
    }

    function ui(a) {
      z(a.ra, "Only valid if end has been set");
      return a.Qb ? a.vb : "[MAX_NAME]"
    }

    function Ai(a) {
      var b = new yi;
      b.oa = a.oa;
      b.ea = a.ea;
      b.pa = a.pa;
      b.dc = a.dc;
      b.Ib = a.Ib;
      b.xb = a.xb;
      b.ra = a.ra;
      b.ac = a.ac;
      b.Qb = a.Qb;
      b.vb = a.vb;
      b.g = a.g;
      return b
    }
    h = yi.prototype;
    h.oe = function (a) {
      var b = Ai(this);
      b.oa = !0;
      b.ea = a;
      b.Kb = "";
      return b
    };
    h.pd = function (a) {
      var b = Ai(this);
      b.oa = !0;
      b.ea = a;
      b.Kb = "l";
      return b
    };
    h.qd = function (a) {
      var b = Ai(this);
      b.oa = !0;
      b.ea = a;
      b.Kb = "r";
      return b
    };
    h.Qc = function (a, b) {
      var c = Ai(this);
      c.pa = !0;
      p(a) || (a = null);
      c.dc = a;
      null != b ? (c.Ib = !0, c.xb = b) : (c.Ib = !1, c.xb = "");
      return c
    };
    h.wc = function (a, b) {
      var c = Ai(this);
      c.ra = !0;
      p(a) || (a = null);
      c.ac = a;
      p(b) ? (c.Qb = !0, c.vb = b) : (c.fh = !1, c.vb = "");
      return c
    };

    function Bi(a, b) {
      var c = Ai(a);
      c.g = b;
      return c
    }

    function hf(a) {
      var b = {};
      a.pa && (b.sp = a.dc, a.Ib && (b.sn = a.xb));
      a.ra && (b.ep = a.ac, a.Qb && (b.en = a.vb));
      if (a.oa) {
        b.l = a.ea;
        var c = a.Kb;
        "" === c && (c = wi(a) ? "l" : "r");
        b.vf = c
      }
      a.g !== R && (b.i = a.g.toString());
      return b
    }

    function uf(a) {
      return !(a.pa || a.ra || a.oa)
    }

    function vf(a) {
      var b = {};
      if (uf(a) && a.g == R) return b;
      var c;
      a.g === R ? c = "$priority" : a.g === fe ? c = "$value" : a.g === ce ? c = "$key" : (z(a.g instanceof Yd, "Unrecognized index type!"), c = a.g.toString());
      b.orderBy = u(c);
      a.pa && (b.startAt = u(a.dc), a.Ib && (b.startAt += "," + u(a.xb)));
      a.ra && (b.endAt = u(a.ac), a.Qb && (b.endAt += "," + u(a.vb)));
      a.oa && (wi(a) ? b.limitToFirst = a.ea : b.limitToLast = a.ea);
      return b
    }
    h.toString = function () {
      return u(hf(this))
    };

    function Z(a, b, c, d) {
      this.D = a;
      this.path = b;
      this.B = c;
      this.ic = d
    }

    function Ci(a) {
      var b = null,
        c = null;
      a.pa && (b = ti(a));
      a.ra && (c = vi(a));
      if (a.g === ce) {
        if (a.pa) {
          if ("[MIN_NAME]" != si(a)) throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
          if ("string" !== typeof b) throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
        }
        if (a.ra) {
          if ("[MAX_NAME]" != ui(a)) throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
          if ("string" !==
            typeof c) throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
        }
      } else if (a.g === R) {
        if (null != b && !Gd(b) || null != c && !Gd(c)) throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");
      } else if (z(a.g instanceof Yd || a.g === fe, "unknown index type."), null != b && "object" === typeof b || null != c && "object" === typeof c) throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
    }

    function Di(a) {
      if (a.pa && a.ra && a.oa && (!a.oa || "" === a.Kb)) throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");
    }

    function Ei(a, b) {
      if (!0 === a.ic) throw Error(b + ": You can't combine multiple orderBy calls.");
    }
    Z.prototype.kc = function (a) {
      F("Query.ref", 0, 1, arguments.length);
      a && Pd("Query.ref", a);
      return new W(this.app, this.D, a ? this.path.u(a) : this.path)
    };
    Z.prototype.ref = Z.prototype.kc;
    Z.prototype.Ab = function (a, b, c, d) {
      F("Query.on", 2, 4, arguments.length);
      Md("Query.on", a, !1);
      G("Query.on", 2, b, !1);
      var e = Fi("Query.on", c, d);
      if ("value" === a) di(this.D, this, new mg(b, e.cancel || null, e.context || null));
      else {
        var f = {};
        f[a] = b;
        di(this.D, this, new ng(f, e.cancel, e.context))
      }
      return b
    };
    Z.prototype.on = Z.prototype.Ab;
    Z.prototype.fc = function (a, b, c) {
      F("Query.off", 0, 3, arguments.length);
      Md("Query.off", a, !0);
      G("Query.off", 2, b, !0);
      vd("Query.off", 3, c);
      var d = null,
        e = null;
      "value" === a ? d = new mg(b || null, null, c || null) : a && (b && (e = {}, e[a] = b), d = new ng(e, null, c || null));
      e = this.D;
      d = ".info" === J(this.path) ? e.nd.nb(this, d) : e.S.nb(this, d);
      Ph(e.ha, this.path, d)
    };
    Z.prototype.off = Z.prototype.fc;
    Z.prototype.ef = function (a, b, c, d) {
      function e(c) {
        k && (k = !1, g.fc(a, e), b && b.call(f.context, c), l.resolve(c))
      }
      F("Query.once", 1, 4, arguments.length);
      Md("Query.once", a, !1);
      G("Query.once", 2, b, !0);
      var f = Fi("Query.once", c, d),
        g = this,
        k = !0,
        l = new x;
      bc(l.m);
      this.Ab(a, e, function (b) {
        g.fc(a, e);
        f.cancel && f.cancel.call(f.context, b);
        l.reject(b)
      });
      return l.m
    };
    Z.prototype.once = Z.prototype.ef;
    Z.prototype.once = Z.prototype.ef;
    Z.prototype.oe = function (a) {
      B("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");
      F("Query.limit", 1, 1, arguments.length);
      if (!fa(a) || Math.floor(a) !== a || 0 >= a) throw Error("Query.limit: First argument must be a positive integer.");
      if (this.B.oa) throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");
      var b = this.B.oe(a);
      Di(b);
      return new Z(this.D, this.path, b, this.ic)
    };
    Z.prototype.limit = Z.prototype.oe;
    Z.prototype.pd = function (a) {
      F("Query.limitToFirst", 1, 1, arguments.length);
      if (!fa(a) || Math.floor(a) !== a || 0 >= a) throw Error("Query.limitToFirst: First argument must be a positive integer.");
      if (this.B.oa) throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
      return new Z(this.D, this.path, this.B.pd(a), this.ic)
    };
    Z.prototype.limitToFirst = Z.prototype.pd;
    Z.prototype.limitToFirst = Z.prototype.pd;
    Z.prototype.qd = function (a) {
      F("Query.limitToLast", 1, 1, arguments.length);
      if (!fa(a) || Math.floor(a) !== a || 0 >= a) throw Error("Query.limitToLast: First argument must be a positive integer.");
      if (this.B.oa) throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
      return new Z(this.D, this.path, this.B.qd(a), this.ic)
    };
    Z.prototype.limitToLast = Z.prototype.qd;
    Z.prototype.limitToLast = Z.prototype.qd;
    Z.prototype.ff = function (a) {
      F("Query.orderByChild", 1, 1, arguments.length);
      if ("$key" === a) throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');
      if ("$priority" === a) throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');
      if ("$value" === a) throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');
      Nd("Query.orderByChild", 1, a, !1);
      Ei(this, "Query.orderByChild");
      var b = Bi(this.B, new Yd(a));
      Ci(b);
      return new Z(this.D,
        this.path, b, !0)
    };
    Z.prototype.orderByChild = Z.prototype.ff;
    Z.prototype.orderByChild = Z.prototype.ff;
    Z.prototype.gf = function () {
      F("Query.orderByKey", 0, 0, arguments.length);
      Ei(this, "Query.orderByKey");
      var a = Bi(this.B, ce);
      Ci(a);
      return new Z(this.D, this.path, a, !0)
    };
    Z.prototype.orderByKey = Z.prototype.gf;
    Z.prototype.orderByKey = Z.prototype.gf;
    Z.prototype.hf = function () {
      F("Query.orderByPriority", 0, 0, arguments.length);
      Ei(this, "Query.orderByPriority");
      var a = Bi(this.B, R);
      Ci(a);
      return new Z(this.D, this.path, a, !0)
    };
    Z.prototype.orderByPriority = Z.prototype.hf;
    Z.prototype.orderByPriority = Z.prototype.hf;
    Z.prototype.jf = function () {
      F("Query.orderByValue", 0, 0, arguments.length);
      Ei(this, "Query.orderByValue");
      var a = Bi(this.B, fe);
      Ci(a);
      return new Z(this.D, this.path, a, !0)
    };
    Z.prototype.orderByValue = Z.prototype.jf;
    Z.prototype.orderByValue = Z.prototype.jf;
    Z.prototype.Qc = function (a, b) {
      F("Query.startAt", 0, 2, arguments.length);
      Hd("Query.startAt", a, this.path, !0);
      Nd("Query.startAt", 2, b, !0);
      var c = this.B.Qc(a, b);
      Di(c);
      Ci(c);
      if (this.B.pa) throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");
      p(a) || (b = a = null);
      return new Z(this.D, this.path, c, this.ic)
    };
    Z.prototype.startAt = Z.prototype.Qc;
    Z.prototype.startAt = Z.prototype.Qc;
    Z.prototype.wc = function (a, b) {
      F("Query.endAt", 0, 2, arguments.length);
      Hd("Query.endAt", a, this.path, !0);
      Nd("Query.endAt", 2, b, !0);
      var c = this.B.wc(a, b);
      Di(c);
      Ci(c);
      if (this.B.ra) throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");
      return new Z(this.D, this.path, c, this.ic)
    };
    Z.prototype.endAt = Z.prototype.wc;
    Z.prototype.endAt = Z.prototype.wc;
    Z.prototype.Ne = function (a, b) {
      F("Query.equalTo", 1, 2, arguments.length);
      Hd("Query.equalTo", a, this.path, !1);
      Nd("Query.equalTo", 2, b, !0);
      if (this.B.pa) throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");
      if (this.B.ra) throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");
      return this.Qc(a, b).wc(a, b)
    };
    Z.prototype.equalTo = Z.prototype.Ne;
    Z.prototype.equalTo = Z.prototype.Ne;
    Z.prototype.toString = function () {
      F("Query.toString", 0, 0, arguments.length);
      for (var a = this.path, b = "", c = a.ba; c < a.A.length; c++) "" !== a.A[c] && (b += "/" + encodeURIComponent(String(a.A[c])));
      return this.D.toString() + (b || "/")
    };
    Z.prototype.toString = Z.prototype.toString;

    function ff(a) {
      a = Bc(hf(a.B));
      return "{}" === a ? "default" : a
    }

    function Fi(a, b, c) {
      var d = {
        cancel: null,
        context: null
      };
      if (b && c) d.cancel = b, G(a, 3, d.cancel, !0), d.context = c, vd(a, 4, d.context);
      else if (b)
        if ("object" === typeof b && null !== b) d.context = b;
        else if ("function" === typeof b) d.cancel = b;
      else throw Error(ud(a, 3, !0) + " must either be a cancel callback or a context object.");
      return d
    };

    function Gi(a, b) {
      this.committed = a;
      this.snapshot = b
    };
    var Hi = function () {
      var a = 0,
        b = [];
      return function (c) {
        var d = c === a;
        a = c;
        for (var e = Array(8), f = 7; 0 <= f; f--) e[f] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64), c = Math.floor(c / 64);
        z(0 === c, "Cannot push at time == 0");
        c = e.join("");
        if (d) {
          for (f = 11; 0 <= f && 63 === b[f]; f--) b[f] = 0;
          b[f]++
        } else
          for (f = 0; 12 > f; f++) b[f] = Math.floor(64 * Math.random());
        for (f = 0; 12 > f; f++) c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
        z(20 === c.length, "nextPushId: Length should be 20.");
        return c
      }
    }();

    function W(a, b, c) {
      this.app = a;
      if (!b && !c) {
        b = a.options.syncURL;
        if (!b) throw Error("Could not find 'syncURL' in options.");
        a = La(b);
        c = a.Jg;
        "wilddog" === a.domain && xc(a.host + " is no longer supported. Please use <YOUR WILDDOG>.wilddogio.com instead");
        c || xc("Cannot parse Wilddog url. Please use https://<YOUR WILDDOG>.wilddogio.com");
        a.Hb || "undefined" !== typeof window && window.location && window.location.protocol && -1 !== window.location.protocol.indexOf("https:") && B("Insecure Wilddog access from a secure page. Please use https.");
        if (a.Db) {
          var d = a.Db;
          d && (d = d.replace(/^\/*\.info(\/|$)/, "/"));
          q(d) && 0 !== d.length && !Ed.test(d) || xc("App syncURL was an invalid path: " + b + '. Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"')
        }
        b = new ei(a.host, a.Hb, c);
        a = new H(a.Db);
        c = oi.Vb();
        var d = this.app,
          e = b.toString();
        c.Wa[d.name] || (c.Wa[d.name] = {});
        var f = t(c.Wa[d.name], e);
        f || (f = new Sh(d, b, c.Tg), c.Wa[d.name][e] = f);
        b = f;
        c = a
      }
      Z.call(this, b, c, zi, !1)
    }
    la(W, Z);
    W.prototype.name = function () {
      B("Wilddog.name() being deprecated. Please use Wilddog.key() instead.");
      F("Wilddog.name", 0, 0, arguments.length);
      return this.key()
    };
    W.prototype.name = W.prototype.name;
    W.prototype.key = function () {
      F("Wilddog.key", 0, 0, arguments.length);
      return this.path.f() ? null : yd(this.path)
    };
    W.prototype.key = W.prototype.key;
    W.prototype.u = function (a) {
      F("Wilddog.child", 1, 1, arguments.length);
      fa(a) ? a = String(a) : a instanceof H || (null === J(this.path) ? Pd("Wilddog.child", a) : Od("Wilddog.child", a));
      return new W(this.app, this.D, this.path.u(a))
    };
    W.prototype.child = W.prototype.u;
    W.prototype.parent = function () {
      F("Wilddog.parent", 0, 0, arguments.length);
      var a = this.path.parent();
      return null === a ? null : new W(this.app, this.D, a)
    };
    W.prototype.parent = W.prototype.parent;
    W.prototype.root = function () {
      F("Wilddog.ref", 0, 0, arguments.length);
      for (var a = this; null !== a.parent();) a = a.parent();
      return a
    };
    W.prototype.root = W.prototype.root;
    W.prototype.set = function (a, b) {
      F("Wilddog.set", 1, 2, arguments.length);
      Qd("Wilddog.set", this.path);
      Hd("Wilddog.set", a, this.path, !1);
      G("Wilddog.set", 2, b, !0);
      var c = new x;
      this.D.ob(this.path, a, null, y(c, b));
      return c.m
    };
    W.prototype.set = W.prototype.set;
    W.prototype.update = function (a, b) {
      F("Wilddog.update", 1, 2, arguments.length);
      Qd("Wilddog.update", this.path);
      if (ea(a)) {
        for (var c = {}, d = 0; d < a.length; ++d) c["" + d] = a[d];
        a = c;
        B("Passing an Array to Wilddog.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")
      }
      Kd("Wilddog.update", a, this.path);
      G("Wilddog.update", 2, b, !0);
      c = new x;
      this.D.update(this.path, a, y(c, b));
      return c.m
    };
    W.prototype.update = W.prototype.update;
    W.prototype.ob = function (a, b, c) {
      F("Wilddog.setWithPriority", 2, 3, arguments.length);
      Qd("Wilddog.setWithPriority", this.path);
      Hd("Wilddog.setWithPriority", a, this.path, !1);
      Ld("Wilddog.setWithPriority", 2, b);
      G("Wilddog.setWithPriority", 3, c, !0);
      if (".length" === this.key() || ".keys" === this.key()) throw "Wilddog.setWithPriority failed: " + this.key() + " is a read-only object.";
      var d = new x;
      this.D.ob(this.path, a, b, y(d, c));
      return d.m
    };
    W.prototype.setWithPriority = W.prototype.ob;
    W.prototype.remove = function (a) {
      F("Wilddog.remove", 0, 1, arguments.length);
      Qd("Wilddog.remove", this.path);
      G("Wilddog.remove", 1, a, !0);
      return this.set(null, a)
    };
    W.prototype.remove = W.prototype.remove;
    W.prototype.transaction = function (a, b, c) {
      F("Wilddog.transaction", 1, 3, arguments.length);
      Qd("Wilddog.transaction", this.path);
      G("Wilddog.transaction", 1, a, !1);
      G("Wilddog.transaction", 2, b, !0);
      if (p(c) && "boolean" != typeof c) throw Error(ud("Wilddog.transaction", 3, !0) + "must be a boolean.");
      if (".length" === this.key() || ".keys" === this.key()) throw "Wilddog.transaction failed: " + this.key() + " is a read-only object.";
      "undefined" === typeof c && (c = !0);
      var d = new x;
      ga(b) && bc(d.m);
      fi(this.D, this.path, a, function (a, c, g) {
        a ? d.reject(a) :
          d.resolve(new Gi(c, g));
        ga(b) && b(a, c, g)
      }, c);
      return d.m
    };
    W.prototype.transaction = W.prototype.transaction;
    W.prototype.xg = function (a, b) {
      F("Wilddog.setPriority", 1, 2, arguments.length);
      Qd("Wilddog.setPriority", this.path);
      Ld("Wilddog.setPriority", 1, a);
      G("Wilddog.setPriority", 2, b, !0);
      var c = new x;
      this.D.ob(this.path.u(".priority"), a, null, y(c, b));
      return c.m
    };
    W.prototype.setPriority = W.prototype.xg;
    W.prototype.push = function (a, b) {
      F("Wilddog.push", 0, 2, arguments.length);
      Qd("Wilddog.push", this.path);
      Hd("Wilddog.push", a, this.path, !0);
      G("Wilddog.push", 2, b, !0);
      var c = Vh(this.D),
        d = Hi(c),
        c = this.u(d);
      if (null != a) {
        var e = this,
          f = c.set(a, b).then(function () {
            return e.u(d)
          });
        c.then = r(f.then, f);
        c["catch"] = r(f.then, f, void 0);
        ga(b) && bc(f)
      }
      return c
    };
    W.prototype.push = W.prototype.push;
    W.prototype.onDisconnect = function () {
      Qd("Wilddog.onDisconnect", this.path);
      return new Y(this.D, this.path)
    };
    W.prototype.onDisconnect = W.prototype.onDisconnect;

    function Ii() {
      F("Wilddog.goOffline", 0, 0, arguments.length);
      oi.Vb().yc(this.app)
    }
    ka("module$exports$wd$sync$Sync.goOffline", Ii);

    function Ji() {
      F("Wilddog.goOnline", 0, 0, arguments.length);
      oi.Vb().resume(this.app)
    }
    ka("module$exports$wd$sync$Sync.goOnline", Ji);
    var Ki = {
      TIMESTAMP: {
        ".sv": "timestamp"
      }
    };
    ka("module$exports$wd$sync$Sync.ServerValue", Ki);
    ka("module$exports$wd$sync$Sync.INTERNAL", X);
    ka("module$exports$wd$sync$Sync.Context", oi);
    W.prototype.Zf = Ii;
    W.prototype.goOffline = W.prototype.Zf;
    W.prototype.$f = Ji;
    W.prototype.goOnline = W.prototype.$f;
    W.prototype.Me = function (a, b) {
      z(!b || !0 === a || !1 === a, "Can't turn on custom loggers persistently.");
      !0 === a ? ("undefined" !== typeof console && ("function" === typeof console.log ? tc = r(console.log, console) : "object" === typeof console.log && (tc = function (a) {
        console.log(a)
      })), b && v.set("logging_enabled", !0)) : a ? tc = a : (tc = null, v.remove("logging_enabled"))
    };
    W.prototype.enableLogging = W.prototype.Me;
    W.prototype.Bf = Ki;
    W.prototype.ServerValue = W.prototype.Bf;
    W.prototype.Af = X;
    W.prototype.INTERNAL = W.prototype.Af;
    fc && fc.lf && fc.lf(Z);
    Sd.ue("sync", function (a) {
      return new W(a)
    });
    Sd.ue("auth", function (a) {
      null == a.Ge && (a.Ge = new N(a));
      return a.Ge
    });
    (function (a) {
      a.auth = a.auth ? a.auth : {};
      [{
        id: "password",
        name: "Wilddog",
        rb: "phoneOrEmail",
        Ya: "password"
      }, {
        id: "password",
        name: "Email",
        rb: "email",
        Ya: "password"
      }, {
        id: "qq",
        name: "QQ",
        rb: "accessToken",
        Ya: "openId"
      }, {
        id: "weibo",
        name: "Weibo",
        rb: "accessToken",
        Ya: "openId"
      }, {
        id: "weixin",
        name: "Weixin",
        rb: "accessToken",
        Ya: "openId"
      }, {
        id: "weixinmp",
        name: "Weixinmp",
        rb: "accessToken",
        Ya: "openId"
      }].forEach(function (b) {
        a.auth[b.name + "AuthProvider"] = function () {
          this.id = b.id;
          this.addScope = function (a) {
            this.scope = a
          }
        };
        "Wilddog" ==
        b.name ? (a.auth.WilddogAuthProvider.emailCredential = function (a, d) {
          var c = {};
          c.provider = b.id;
          c.email = a;
          c[b.Ya] = d;
          return c
        }, a.auth.WilddogAuthProvider.phoneCredential = function (a, d) {
          var c = {};
          c.provider = b.id;
          c.phoneNumber = a;
          c[b.Ya] = d;
          return c
        }) : a.auth[b.name + "AuthProvider"].credential = "Email" == b.name ? function (a, d) {
          B("wilddog.auth.EmailAuthProvider being deprecated. Please usewilddog.auth.WilddogAuthProvider instead.");
          var c = {};
          c.provider = b.id;
          c[b.rb] = a;
          c[b.Ya] = d;
          return c
        } : function (a, d) {
          var c = {};
          c.provider =
            b.id;
          c[b.rb] = a;
          c[b.Ya] = d;
          return c
        }
      })
    })(Sd);
    if ("WEB" == CLIENT_TYPE) "object" == typeof module && module.exports && (module.exports = Sd), "function" == typeof define && define.amd && define("wilddog", [], function () {
      return Sd
    }), "undefined" != typeof window ? window.wilddog = Sd : WorkerGlobalScope && self && (self.wilddog = Sd);
    else if ("NODE" == CLIENT_TYPE || "WX" == CLIENT_TYPE || "RN" == CLIENT_TYPE) module.exports = Sd;
  };
  ns.wrapper(ns.goog, ns.wd)
})({
  goog: {},
  wd: {}
})