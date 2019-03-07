'use strict';
var inc = new Date().getTime(),
  script = {
    name: 'VueCkeditor',
    props: {
      name: {
        type: String,
        default: function() {
          return 'editor-'.concat(++inc);
        }
      },
      value: { type: String },
      id: {
        type: String,
        default: function() {
          return 'editor-'.concat(inc);
        }
      },
      types: {
        type: String,
        default: function() {
          return 'classic';
        }
      },
      config: { type: Object, default: function() {} },
      instanceReadyCallback: { type: Function },
      readOnlyMode: {
        type: Boolean,
        default: function() {
          return !1;
        }
      }
    },
    data: function() {
      return { instanceValue: '' };
    },
    computed: {
      instance: function() {
        return CKEDITOR.instances[this.id];
      }
    },
    watch: {
      value: function(t) {
        try {
          this.instance && this.update(t);
        } catch (t) {}
      },
      readOnlyMode: function(t) {
        this.instance.setReadOnly(t);
      }
    },
    mounted: function() {
      this.create();
    },
    methods: {
      create: function() {
        var t = this;
        'undefined' == typeof CKEDITOR
          ? console.log('CKEDITOR is missing (http://ckeditor.com/)')
          : ('inline' === this.types
              ? CKEDITOR.inline(this.id, this.config)
              : CKEDITOR.replace(this.id, this.config),
            this.instance.setData(this.value),
            this.instance.on('instanceReady', function() {
              t.instance.setData(t.value);
            }),
            this.instance.on('change', this.onChange),
            this.instance.on('mode', this.onMode),
            this.instance.on('blur', function(e) {
              t.$emit('blur', e);
            }),
            this.instance.on('focus', function(e) {
              t.$emit('focus', e);
            }),
            this.instance.on('contentDom', function(e) {
              t.$emit('contentDom', e);
            }),
            CKEDITOR.on('dialogDefinition', function(e) {
              t.$emit('dialogDefinition', e);
            }),
            this.instance.on('fileUploadRequest', function(e) {
              t.$emit('fileUploadRequest', e);
            }),
            this.instance.on('fileUploadResponse', function(e) {
              setTimeout(function() {
                t.onChange();
              }, 0),
                t.$emit('fileUploadResponse', e);
            }),
            void 0 !== this.instanceReadyCallback &&
              this.instance.on('instanceReady', this.instanceReadyCallback),
            this.$once('hook:beforeDestroy', function() {
              t.destroy();
            }));
      },
      update: function(t) {
        this.instanceValue !== t && this.instance.setData(t, { internal: !1 });
      },
      destroy: function() {
        try {
          var t = window.CKEDITOR;
          t.instances && t.instances[this.id] && t.instances[this.id].destroy();
        } catch (t) {}
      },
      onMode: function() {
        var t = this;
        if ('source' === this.instance.mode) {
          var e = this.instance.editable();
          e.attachListener(e, 'input', function() {
            t.onChange();
          });
        }
      },
      onChange: function() {
        var t = this.instance.getData();
        t !== this.value && (this.$emit('input', t), (this.instanceValue = t));
      }
    }
  };
function normalizeComponent(t, e, n, i, o, s, a, c, r, d) {
  'boolean' != typeof a && ((r = c), (c = a), (a = !1));
  var u,
    _ = 'function' == typeof n ? n.options : n;
  if (
    (t &&
      t.render &&
      ((_.render = t.render),
      (_.staticRenderFns = t.staticRenderFns),
      (_._compiled = !0),
      o && (_.functional = !0)),
    i && (_._scopeId = i),
    s
      ? ((u = function(t) {
          (t =
            t ||
            (this.$vnode && this.$vnode.ssrContext) ||
            (this.parent &&
              this.parent.$vnode &&
              this.parent.$vnode.ssrContext)) ||
            'undefined' == typeof __VUE_SSR_CONTEXT__ ||
            (t = __VUE_SSR_CONTEXT__),
            e && e.call(this, r(t)),
            t && t._registeredComponents && t._registeredComponents.add(s);
        }),
        (_._ssrRegister = u))
      : e &&
        (u = a
          ? function() {
              e.call(this, d(this.$root.$options.shadowRoot));
            }
          : function(t) {
              e.call(this, c(t));
            }),
    u)
  )
    if (_.functional) {
      var l = _.render;
      _.render = function(t, e) {
        return u.call(e), l(t, e);
      };
    } else {
      var h = _.beforeCreate;
      _.beforeCreate = h ? [].concat(h, u) : [u];
    }
  return n;
}
var normalizeComponent_1 = normalizeComponent;
const __vue_script__ = script;
var __vue_render__ = function() {
    var t = this.$createElement,
      e = this._self._c || t;
    return e('div', { staticClass: 'ckeditor' }, [
      e('textarea', {
        attrs: {
          name: this.name,
          id: this.id,
          types: this.types,
          config: this.config,
          disabled: this.readOnlyMode
        },
        domProps: { value: this.value }
      })
    ]);
  },
  __vue_staticRenderFns__ = [];
const __vue_inject_styles__ = void 0,
  __vue_scope_id__ = void 0,
  __vue_module_identifier__ = void 0,
  __vue_is_functional_template__ = !1;
var VueCkeditor = normalizeComponent_1(
  { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
  void 0,
  __vue_script__,
  void 0,
  !1,
  void 0,
  void 0,
  void 0
);
module.exports = VueCkeditor;
