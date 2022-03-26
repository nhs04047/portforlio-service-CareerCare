import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";
//EducationCard, EditForm 임포트




function Education({ isEditable, education, setEducations}) {
    const [edit, setEdit] = useState(false);
    return (
        <>
          {edit ? 
          <EducationEditForm setEdit={setEdit} education={education} setEducations={setEducations}/> 
          : <EducationCard isEditable={isEditable} setEdit={setEdit} education={education}/>}
        </>
    )
}

export default Education;