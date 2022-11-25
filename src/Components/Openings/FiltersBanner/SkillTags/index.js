import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
const skill = [
  { name: "Java" },
  { name: "Python" },
  { name: "Go" },
  { name: "Ruby" },
  { name: "Kotlin" },
  { name: "C" },
  { name: "React" },
  { name: "Angular" },
  { name: "R" },
  { name: "C++" }
];
const SkillTags = () => {
  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={skill}
      getOptionLabel={(option) => option.name}
      defaultValue={[skill[3], skill[2], skill[1]]}
      renderInput={(params) => <TextField {...params} label="Skills" />}
      sx={{ width: "500px" }}
    />
  );
};

export default SkillTags;
