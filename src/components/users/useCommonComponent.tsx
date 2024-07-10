import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, TextField } from "@mui/material";

const useCommonComponent = () => {
  const searchComp = () => {
    const handleSearch = (e: any) => {
      const specialChars = /[`!#$%^*()+\=\[\]{};:"\\|,<>\/?~\s]/;
      if (specialChars.test(e.target.value)) {
        return;
      }
      let target = e.target.value.replace(specialChars, "");
    };

    return (
      <>
        <TextField
          sx={{
            mt: 2,

            "& .MuiOutlinedInput-root": {
              "& > fieldset": {
                border: "1px solid #D4C4BE",
              },
            },
            input: {
              "&::placeholder": {
                fontSize: "16px",
              },
            },
          }}
          id="outlined-search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            style: {
              border: "1px solid #DADAD9",
              height: 40,
            },
          }}
          placeholder="Search"
          type="search"
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              handleSearch(e);
            }
          }}
        />
        <Button
          variant="contained"
          sx={{ mt: 2, ml: 1, minWidth: "40px", padding: "6px" }}
        >
          <SearchIcon />
        </Button>
      </>
    );
  };

  return {
    searchComp,
  };
};

export default useCommonComponent;
