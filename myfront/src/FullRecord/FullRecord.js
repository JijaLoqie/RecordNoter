import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import styles from "./FullRecord.module.css";
import SmallButton from "../SmallButton/SmallButton";
const ReactQuill = require("react-quill");

function FullRecord({ handeGoBack }) {
    const [editorValue, setEditorValue] = useState("");
    return (<>
        <div className='Gray-block'>
            <SmallButton text="Back" handler={() => handeGoBack()} />
            <SmallButton text="Save" handler={() => handeGoBack(editorValue)} />
        </div>
        <div className={styles.FullRecord}>
            <ReactQuill
                theme="snow"
                className={styles.EditorInput}
                value={editorValue}
                onChange={(value) => setEditorValue(value)}
                modules={{
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['image', 'code-block']
                    ]
                }}
            />
        </div>
    </>
    );
}

export default FullRecord;
