import './code-editor.css';
// import './syntax.css';
import Editor, { OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import {  useRef } from 'react';
import './syntax.css'


interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}


const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();
  
  const handleMount:OnMount = async (editor, monaco)=>{
    editorRef.current = editor;
  
  }

  function handleEditorChange(value: any) {
    onChange(value);
  }

  const onFormat = () => {
    const unformatted = editorRef.current.getModel().getValue();

    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    editorRef.current.setValue(formatted);

};
  return (

    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onFormat}
      >
        Format
      </button>
      <Editor
        onChange={handleEditorChange}
        value={initialValue}
        onMount={handleMount}
        language='javascript'
        theme='vs-dark'
        height='100%'
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;