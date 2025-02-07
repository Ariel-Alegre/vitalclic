import React, { useState, useRef, useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const ProvinceAutocomplete = () => {
  const [formData, setFormData] = useState({ province: "" });
  const inputRefProvince = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA",
    libraries,
  });

  useEffect(() => {
    if (isLoaded && inputRefProvince.current) {
      const autoCompleteInstance = new window.google.maps.places.Autocomplete(inputRefProvince.current, {
        types: ["(regions)"], // Solo busca regiones (provincias/estados)
        componentRestrictions: { country: "PE" }, // Restringe a Argentina (cambia según el país)
      });

      autoCompleteInstance.addListener("place_changed", () => {
        const place = autoCompleteInstance.getPlace();
        if (place.address_components) {
          const province = place.address_components.find((comp) =>
            comp.types.includes("administrative_area_level_1")
          )?.long_name;

          if (province) {
            setFormData({ province });
          }
        }
      });
    }
  }, [isLoaded]);

  return (
    <Grid item xs={12} sm={3}>
      <TextField
        inputRefProvince={inputRefProvince}
        label="Provincia"
        name="province"
        value={formData.province}
        onChange={(e) => setFormData({ province: e.target.value })}
        fullWidth
        autoComplete="off"
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": { borderColor: "#53676c" },
            "&.Mui-focused fieldset": { borderColor: "#53676c" },
          },
          "& .MuiInputLabel-root": { color: "#000" },
          "& .MuiInputLabel-root.Mui-focused": { color: "#53676c" },
        }}
      />
    </Grid>
  );
};

export default ProvinceAutocomplete;
