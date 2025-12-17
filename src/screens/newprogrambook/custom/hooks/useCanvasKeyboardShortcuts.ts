import { useEffect, useCallback } from 'react';
import type { CanvasItemData } from '../components/CanvasItem';

interface UseCanvasKeyboardShortcutsOptions {
    selectedItemId: string | null;
    selectedItem: CanvasItemData | null;
    clipboard: CanvasItemData | null;
    onDelete: (id: string) => void;
    onCopy: (item: CanvasItemData) => void;
    onPaste: (item: CanvasItemData) => void;
    onDuplicate: (item: CanvasItemData) => void;
    onBringToFront: (id: string) => void;
    onSendToBack: (id: string) => void;
    onBringForward: (id: string) => void;
    onSendBackward: (id: string) => void;
}

export const useCanvasKeyboardShortcuts = ({
    selectedItemId,
    selectedItem,
    clipboard,
    onDelete,
    onCopy,
    onPaste,
    onDuplicate,
    onBringToFront,
    onSendToBack,
    onBringForward,
    onSendBackward,
}: UseCanvasKeyboardShortcutsOptions) => {
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            // Ignore if typing in an input or textarea
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
                return;
            }

            const isCtrlOrMeta = e.ctrlKey || e.metaKey;

            // Delete or Backspace - delete selected item
            if (e.key === 'Delete' && selectedItemId) {
                e.preventDefault();
                onDelete(selectedItemId);
                return;
            }

            // Ctrl/Cmd + C - copy
            if (isCtrlOrMeta && e.key === 'c' && selectedItem) {
                e.preventDefault();
                onCopy(selectedItem);
                return;
            }

            // Ctrl/Cmd + V - paste
            if (isCtrlOrMeta && e.key === 'v' && clipboard) {
                e.preventDefault();
                onPaste(clipboard);
                return;
            }

            // Ctrl/Cmd + D - duplicate
            if (isCtrlOrMeta && e.key === 'd' && selectedItem) {
                e.preventDefault();
                onDuplicate(selectedItem);
                return;
            }

            // Ctrl/Cmd + Shift + ] - bring to front
            if (isCtrlOrMeta && e.shiftKey && e.key === ']' && selectedItemId) {
                e.preventDefault();
                onBringToFront(selectedItemId);
                return;
            }

            // Ctrl/Cmd + Shift + [ - send to back
            if (isCtrlOrMeta && e.shiftKey && e.key === '[' && selectedItemId) {
                e.preventDefault();
                onSendToBack(selectedItemId);
                return;
            }

            // Ctrl/Cmd + ] - bring forward
            if (isCtrlOrMeta && !e.shiftKey && e.key === ']' && selectedItemId) {
                e.preventDefault();
                onBringForward(selectedItemId);
                return;
            }

            // Ctrl/Cmd + [ - send backward
            if (isCtrlOrMeta && !e.shiftKey && e.key === '[' && selectedItemId) {
                e.preventDefault();
                onSendBackward(selectedItemId);
                return;
            }
        },
        [
            selectedItemId,
            selectedItem,
            clipboard,
            onDelete,
            onCopy,
            onPaste,
            onDuplicate,
            onBringToFront,
            onSendToBack,
            onBringForward,
            onSendBackward,
        ]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
};
