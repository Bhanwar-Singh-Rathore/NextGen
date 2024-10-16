import { EditorBtns } from '@/lib/constants';
import { NavigationIcon } from 'lucide-react';
import React from 'react';
import clsx from 'clsx';
import { useEditor } from '@/providers/editor/editor-provider';

type Props = {
  elementId: string;
};

const NavbarComponentPlaceholder = (props: Props) => {
  const { dispatch, state } = useEditor();

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (!type) return;
    e.dataTransfer.setData('componentType', type); // Set the type for dragging
    e.dataTransfer.effectAllowed = 'move'; // Allow move action during drag
  };

  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: { id: props.elementId },
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: { id: props.elementId } },
    });
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'navbar')} // Call drag start
      onClick={handleOnClick} // Handle click to select element
      className={clsx(
        'h-14 w-14 bg-gray-300 rounded-lg flex items-center justify-center cursor-move transition-all',
        {
          'border border-blue-500': state.editor.selectedElement.id === props.elementId,
          'border-dashed border-gray-400': state.editor.selectedElement.id !== props.elementId,
        }
      )}
    >
      <NavigationIcon size={40} className="text-muted-foreground" />
      {state.editor.selectedElement.id === props.elementId && (
        <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold top-0 right-0 rounded-t-lg text-white">
          <span className="cursor-pointer" onClick={handleDeleteElement}>
            🗑️
          </span>
        </div>
      )}
    </div>
  );
};

export default NavbarComponentPlaceholder;
