import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import theme from "../../../../styles/theme";
import { useRouter } from "next/router";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
  ThemeProvider,
  Box,
} from "@mui/material";
import { thema } from "./theme";
import { usePromotion, useProduct } from "@/hooks";
import { promotionSchema } from "@/types";

type PromotionFormInputs = z.infer<typeof promotionSchema>;

const UpdatePromotion: React.FC = () => {
  const router = useRouter();
  const { updatePromotion, getPromotionById, promotionData } = usePromotion();
  const { products, getAllProducts } = useProduct();
  const { id } = router.query;

  useEffect(() => {
    getAllProducts();
    if (id) {
      getPromotionById(id as string);
    }
  }, [getPromotionById, id, getAllProducts]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PromotionFormInputs>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      name: "",
      discount: 0,
      //product_id: "",
      start_date: "",
      end_date: "",
    },
  });

  useEffect(() => {
    if (promotionData) {
      reset(promotionData);
    }
  }, [promotionData, reset]);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<PromotionFormInputs | null>(null);

  const onSubmit = (data: PromotionFormInputs) => {
    console.log(data);
    setFormData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    if (formData && id) {
      try {
        const formattedData = {
          ...formData,
        };

        console.log("Formatted Data: ", formattedData);
        await updatePromotion(id as string, formattedData);
        console.log("Promoção atualizada com sucesso!");
        setOpen(false);
        router.push("/admin/promotions");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ThemeProvider theme={thema}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <h1>ADMIN</h1>
        <div
          style={{
            backgroundColor: "#ededed",
            height: "90vh",
            width: "100%",
            borderRadius: "1rem",
            gap: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "#121212", margin: "1.5rem" }}>
            ATUALIZAR PROMOÇÃO
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  sx={{ width: "20rem" }}
                />
              )}
            />
            <Controller
              name="discount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Porcentagem"
                  variant="outlined"
                  error={!!errors.discount}
                  helperText={errors.discount?.message}
                  sx={{ width: "20rem" }}
                  inputProps={{ min: 1, max: 100 }}
                />
              )}
            />
            {/* <Controller
              name="product_id"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="ID do produto"
                  variant="outlined"
                  error={!!errors.product_id}
                  helperText={errors.product_id?.message}
                  sx={{ width: "20rem" }}
                >
                  {products.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            /> */}
            <Controller
              name="start_date"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Data de início"
                  variant="outlined"
                  error={!!errors.start_date}
                  helperText={errors.start_date?.message}
                  sx={{ width: "20rem" }}
                />
              )}
            />
            <Controller
              name="end_date"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Data de término"
                  variant="outlined"
                  error={!!errors.end_date}
                  helperText={errors.end_date?.message}
                  sx={{ width: "20rem" }}
                />
              )}
            />
            <ThemeProvider theme={theme}>
              <Button
                type="submit"
                style={{
                  color: "#FFFFFF",
                  fontWeight: 800,
                  marginTop: "2rem",
                }}
                variant="contained"
              >
                Atualizar
              </Button>
            </ThemeProvider>
          </form>
        </div>
      </div>
      <ThemeProvider theme={theme}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirmação</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Você tem certeza de que deseja atualizar essa promoção?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button color="primary" autoFocus onClick={handleConfirm}>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </ThemeProvider>
  );
};

export default UpdatePromotion;
