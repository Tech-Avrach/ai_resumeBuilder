import { useState, useEffect } from 'react';
import { 
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    Editor,
    EditorProvider,
    HtmlButton,
    Separator,
    Toolbar,
} from 'react-simple-wysiwyg';

function RichTextEditor({ value, onRichTextEditorChange }) {
    const [editorValue, setEditorValue] = useState(value);

    useEffect(() => {
        setEditorValue(value);
    }, [value]);

    function onChange(e) {
        setEditorValue(e.target.value);
        onRichTextEditorChange(e);
    }

    return (
        <div>
            <EditorProvider>
                <Editor value={editorValue} onChange={onChange}>
                    <Toolbar>
                        <BtnUndo />
                        <BtnRedo />
                        <Separator />
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                        <Separator />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
}

export default RichTextEditor;
