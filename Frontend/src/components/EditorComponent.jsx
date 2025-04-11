import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'
import conf from '../conf/conf';
function EditorComponent({name, label, defaultValue="", onChange, className=""}) {

  const [content, setContent] = useState(defaultValue)
  //we need to update the component when the content changes
  useEffect(()=>{
    if(onChange){
      onChange(content);
    }
  },[content])
  

  const editorRef = useRef(null);
  

  return (
    <div className={`${className}`}>
      {label && <label className="inline-block mb-1">{label}</label>}
      <Editor
        apiKey={conf.editorApiKey}
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue={defaultValue}
        value={content}
        init={{
          branding:false,
          height: 400,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family: "dolce" , sans-serif; font-size:15px }'
        }}
        onEditorChange={(newContent) => setContent(newContent)}
      />
      
    
    </div>
  )
}

export default EditorComponent
