import React, { useCallback } from "react";
import { BaseEditor } from "slate";
import {
  DefaultElement,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import isHotkey from "is-hotkey";
import { toggleStyle } from "../utils/EditorUtils";

export default function useEditorConfig(editor: BaseEditor) {
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      KeyBindings.onKeyDown(editor, event);
    },
    [editor]
  );
  return { renderElement, renderLeaf, onKeyDown };
}

function renderElement(props: RenderElementProps) {
  const { element, children, attributes } = props;
  switch (element.type) {
    case "paragraph":
      return <p {...attributes}>{children}</p>;
    case "h1":
      return <h1 {...attributes}>{children}</h1>;
    case "h2":
      return <h2 {...attributes}>{children}</h2>;
    case "h3":
      return <h3 {...attributes}>{children}</h3>;
    case "h4":
      return <h4 {...attributes}>{children}</h4>;
    default:
      // For the default case, we delegate to Slate's default rendering.
      return <DefaultElement {...props} />;
  }
}

function renderLeaf({ attributes, children, leaf }: RenderLeafProps) {
  let el = <>{children}</>;

  if (leaf.bold) {
    el = <strong>{el}</strong>;
  }

  if (leaf.code) {
    el = <code>{el}</code>;
  }

  if (leaf.italic) {
    el = <em>{el}</em>;
  }

  if (leaf.underline) {
    el = <u>{el}</u>;
  }

  return <span {...attributes}>{el}</span>;
}

const KeyBindings = {
  onKeyDown: (editor: BaseEditor, event: React.KeyboardEvent) => {
    if (isHotkey("mod+b", event)) {
      toggleStyle(editor, "bold");
      return;
    }
    if (isHotkey("mod+i", event)) {
      toggleStyle(editor, "italic");
      return;
    }
    if (isHotkey("mod+c", event)) {
      toggleStyle(editor, "code");
      return;
    }
    if (isHotkey("mod+u", event)) {
      toggleStyle(editor, "underline");
      return;
    }
  },
};
