import React, { useState } from 'react';
import { ICellEditorParams } from 'ag-grid-community';

const MultiFieldEditor: React.FC<ICellEditorParams> = (props) => {
    const [className, setClassName] = useState(props.data.ClassName);
    const [description, setDescription] = useState(props.data.Description);

    const onSave = () => {
        // Update the row data with new values
        props.data.ClassName = className;
        props.data.Description = description;
        props.api.stopEditing(); // Stop editing mode
    };

    return (
        <div>
            <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Class Name"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <button onClick={onSave}>Save</button>
        </div>
    );
};

export default MultiFieldEditor;
