/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FormValues } from "../../interfaces/Product";
import {
  Box,
  CssBaseline,
  Button,
  Typography,
  Grid,
  Container,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Navigation from "../../components/Navigation";
import { Link, useNavigate } from "react-router-dom";
import {
  AddAPhotoOutlined,
  CloudUploadOutlined,
  ChevronLeft,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { AxiosClient } from "../../utils/AxiosClient";

const AddProducts = () => {
  document.title = "Products Management || !SHOP";
  const [inAction, setAction] = useState(false);
  const navigate = useNavigate();
  const formData = new FormData();
  const submit = (data) => {
    if (data.quantity <= 0 || data.p_price <= 0) {
      toast.error("Quantity / Price must be greater than 0");
      return;
    }
    if (data.imgs.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    setAction(true);
    toast.loading("Saving the product information");

    formData.append("pname", data.pname);
    formData.append("p_price", data.p_price);
    formData.append("quantity", data.quantity);
    formData.append("desc", data.desc);
    for (let i = 0; i < data.imgs.length; i++) {
      const file = data.imgs[i];
      formData.append("imgs", file);
    }
    AxiosClient.post("/products/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcyNCwiZW1haWwiOiJ0cmVzb3IudGVzdEBnbWFpbC5jb20iLCJyb2xlIjoic2VsbGVyIiwicGhvbmVOdW1iZXIiOiIrMjUwNzgzMDA2OTAyIiwibmFtZSI6IlRyZXNvciBBbGFpbiJ9._BC1vbaXZ0hBtaDLzzwqszVuEpyldzAHMd82zv64zA8",
      },
    })
      .then((response) => {
        console.log(response);
        toast.remove();
        toast.success(response.data.message, { duration: 5000 });
        setTimeout(() => {
          navigate("/seller-products");
        }, 4000);
      })
      .catch((error) => {
        console.error(error);
        toast.remove();
        toast.error(error?.response.data.message, { duration: 10000 });
      })
      .finally(() => {
        setAction(false);
      });
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Navigation />
        <Box component="main" sx={{ flexGrow: 1, pt: 10, pl: 2 }}>
          <Button
            variant="outlined"
            component={Link}
            to="/seller-products"
            color="info"
            startIcon={<ChevronLeft />}
          >
            Back To View
          </Button>
          <Container maxWidth="xl">
            <Grid
              container
              spacing={2}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Grid item xs={12} sm={8} md={5} lg={5}>
                <Box
                  sx={{
                    boxShadow: "0 0 15px 0 rgba(0,0,0,.4)",
                    mt: 2,
                    borderRadius: "10px",
                    p: 1,
                  }}
                >
                  <Typography
                    align="center"
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                  >
                    ADD A NEW PRODUCT
                  </Typography>
                  <Box mt={5} px={1}>
                    <form
                      style={{ textAlign: "center" }}
                      id="prodForm"
                      encType="multipart/form-data"
                      onSubmit={handleSubmit(submit)}
                      noValidate
                      autoComplete="off"
                    >
                      <Controller
                        name="pname"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            sx={{ mb: 2 }}
                            label="Product Name"
                            error={Boolean(errors.pname)}
                            variant="outlined"
                            fullWidth
                            id="pname"
                            helperText={
                              errors.pname
                                ? "Product Name can not be blank"
                                : null
                            }
                          />
                        )}
                      />

                      <Controller
                        name="p_price"
                        control={control}
                        rules={{ required: true }}
                        defaultValue={0}
                        render={({ field }) => (
                          <TextField
                            sx={{ mb: 1 }}
                            {...field}
                            type="number"
                            variant="outlined"
                            fullWidth
                            label="Product Price"
                            id="price"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  FRW
                                </InputAdornment>
                              ),
                            }}
                            error={Boolean(errors.p_price)}
                            helperText={
                              errors.p_price
                                ? "How much your product cost?"
                                : null
                            }
                          />
                        )}
                      />

                      <Controller
                        name="quantity"
                        defaultValue={1}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            sx={{ mb: 1 }}
                            {...field}
                            type="number"
                            variant="outlined"
                            fullWidth
                            label="Product Quantity"
                            id="qty"
                            error={Boolean(errors.quantity)}
                            helperText={
                              errors.quantity ? "Provide the quantity" : null
                            }
                          />
                        )}
                      />

                      <Controller
                        name="desc"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextField
                            sx={{ mb: 2 }}
                            {...field}
                            variant="outlined"
                            multiline
                            maxRows={7}
                            fullWidth
                            label="Product Description"
                            id="desc"
                            error={Boolean(errors.desc)}
                            helperText={
                              errors.desc
                                ? "Tell us a bit about your product"
                                : null
                            }
                          />
                        )}
                      />
                      <Box
                        sx={{ textAlign: "left" }}
                        className="imageList"
                        mb={3}
                      >
                        <Typography paragraph color="GrayText">
                          Product Images
                        </Typography>
                        <IconButton
                          color="info"
                          aria-label="upload picture"
                          component="label"
                        >
                          <input
                            {...register("imgs")}
                            hidden
                            accept="image/*"
                            multiple
                            type="file"
                          />
                          <AddAPhotoOutlined />
                        </IconButton>
                      </Box>
                      <Button
                        disabled={inAction}
                        sx={{ mb: 3 }}
                        type="submit"
                        variant="contained"
                        startIcon={<CloudUploadOutlined />}
                      >
                        Save Product
                      </Button>
                    </form>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Toaster />
    </>
  );
};

export default AddProducts;
