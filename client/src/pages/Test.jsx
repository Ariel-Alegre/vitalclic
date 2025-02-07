import React, { useState, useRef, useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const AddressAutocomplete = () => {
  const [formData, setFormData] = useState({ address: "" });
  const inputRefAddress = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA", // Reemplaza con tu clave de API válida
    libraries,
  });

  useEffect(() => {
    if (isLoaded && inputRefAddress.current) {
      const autoCompleteInstance = new window.google.maps.places.Autocomplete(
        inputRefAddress.current,
        {
          types: ["address"], // Busca direcciones completas
          componentRestrictions: { country: "PE" }, // Restricción a Perú
        }
      );

      autoCompleteInstance.addListener("place_changed", () => {
        const place = autoCompleteInstance.getPlace();
        if (place.formatted_address) {
          // Si se seleccionó una dirección completa, actualiza el estado
          setFormData({ address: place.formatted_address });
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
        inputRef={inputRefAddress} // Usamos el ref para el autocompletado
        label="Dirección"
        name="address"
        value={formData.address} // El valor del campo de texto es la dirección seleccionada
        onChange={(e) => setFormData({ address: e.target.value })} // Permite cambios manuales en el input
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

export default AddressAutocomplete;
