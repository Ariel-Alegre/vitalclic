import React, { useState, useRef, useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const DistrictAutocomplete = () => {
  const [formData, setFormData] = useState({ district: "" });
  const inputRefDistrict = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA", // Reemplaza con tu clave de API válida
    libraries,
  });

  useEffect(() => {
    if (isLoaded && inputRefDistrict.current) {
      const autoCompleteInstance = new window.google.maps.places.Autocomplete(
        inputRefDistrict.current,
        {
          types: ["(regions)"], // Solo buscará regiones (provincias o distritos)
          componentRestrictions: { country: "PE" }, // Restricción a Perú
        }
      );

      autoCompleteInstance.addListener("place_changed", () => {
        const place = autoCompleteInstance.getPlace();
        if (place.address_components) {
          // Buscamos el distrito (sublocality_level_1) en la dirección seleccionada
          const district = place.address_components.find((comp) =>
            comp.types.includes("sublocality_level_1") // Busca el tipo de distrito
          )?.long_name;

          if (district) {
            // Actualiza el estado con el nombre del distrito
            setFormData((prev) => ({
              ...prev,
              district: district, // Asignamos solo el nombre del distrito
            }));
          }
        }
      });

      return () => {
        window.google.maps.event.clearInstanceListeners(autoCompleteInstance);
      };
    }
  }, [isLoaded]);

  return (
    <Grid item xs={12} sm={3}>
      <TextField
        inputRef={inputRefDistrict} // Utilizamos el ref para manejar el autocompletado
        label="Distrito"
        name="district"
        value={formData.district} // Aquí solo se mostrará el nombre del distrito
        onChange={(e) => setFormData({ district: e.target.value })} // Permite cambios manuales si es necesario
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

export default DistrictAutocomplete;
