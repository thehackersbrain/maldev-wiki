import type { ThemeRegistrationRaw } from 'shiki';

/** Mockup palette as a Shiki theme: purple calls, orange literals, blue keywords. */
export const maldevTheme = {
  "name": "maldev",
  "type": "dark",
  "colors": {
    "editor.background": "#0d0f13",
    "editor.foreground": "#d6d9df"
  },
  "settings": [
    {
      "scope": [
        "comment",
        "punctuation.definition.comment"
      ],
      "settings": {
        "foreground": "#565b66"
      }
    },
    {
      "scope": [
        "string",
        "constant.other.symbol",
        "string.quoted",
        "meta.embedded.line"
      ],
      "settings": {
        "foreground": "#e0a24e"
      }
    },
    {
      "scope": [
        "constant.numeric",
        "constant.language",
        "constant.character",
        "constant.other"
      ],
      "settings": {
        "foreground": "#e0a24e"
      }
    },
    {
      "scope": [
        "keyword",
        "storage",
        "storage.type",
        "storage.modifier",
        "keyword.control"
      ],
      "settings": {
        "foreground": "#5b9dd9"
      }
    },
    {
      "scope": [
        "keyword.operator"
      ],
      "settings": {
        "foreground": "#8b909b"
      }
    },
    {
      "scope": [
        "entity.name.function",
        "support.function",
        "meta.function-call",
        "variable.function"
      ],
      "settings": {
        "foreground": "#ab8fde"
      }
    },
    {
      "scope": [
        "entity.name.type",
        "support.type",
        "support.class",
        "entity.name.class"
      ],
      "settings": {
        "foreground": "#5b9dd9"
      }
    },
    {
      "scope": [
        "variable",
        "meta.definition.variable.name",
        "variable.other"
      ],
      "settings": {
        "foreground": "#d6d9df"
      }
    },
    {
      "scope": [
        "variable.parameter"
      ],
      "settings": {
        "foreground": "#c2c6cd"
      }
    },
    {
      "scope": [
        "entity.name.tag",
        "support.type.property-name"
      ],
      "settings": {
        "foreground": "#5b9dd9"
      }
    },
    {
      "scope": [
        "punctuation",
        "meta.brace"
      ],
      "settings": {
        "foreground": "#8b909b"
      }
    },
    {
      "scope": [
        "entity.name.function.preprocessor",
        "meta.preprocessor"
      ],
      "settings": {
        "foreground": "#ab8fde"
      }
    },
    {
      "scope": [
        "invalid",
        "invalid.illegal"
      ],
      "settings": {
        "foreground": "#e5595b"
      }
    },
    {
      "scope": [
        "markup.heading"
      ],
      "settings": {
        "foreground": "#54e29a",
        "fontStyle": "bold"
      }
    },
    {
      "scope": [
        "markup.inserted"
      ],
      "settings": {
        "foreground": "#54e29a"
      }
    },
    {
      "scope": [
        "markup.deleted"
      ],
      "settings": {
        "foreground": "#e5595b"
      }
    }
  ]
} satisfies ThemeRegistrationRaw;

export default maldevTheme;
