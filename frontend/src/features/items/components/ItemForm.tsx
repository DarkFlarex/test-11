import {ItemMutation} from "../../../types";
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectCategories, selectCategoriesFetching} from "../../categories/categoriesSlice";
import {fetchCategories} from "../../categories/categoriesThunks";
import {CircularProgress, Grid, MenuItem, TextField} from "@mui/material";
import FileInput from "../../../UI/FileInput/FileInput";
import {LoadingButton} from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';

interface Props {
    onSubmit: (item: ItemMutation) => void;
    isLoading: boolean;
}

const ItemForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const categoriesIsFetching = useAppSelector(selectCategoriesFetching);

    const [state, setState] = useState<ItemMutation>({
        category: '',
        title: '',
        description: '',
        price: '',
        image: '',
    });
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const submitFormHandler = (event: React.FormEvent) => {
        event.preventDefault();
        setShowError(true);


        if (!state.image) {
            return;
        }
        onSubmit({ ...state });
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        const value = files && files[0] ? files[0] : null;

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
            <Grid item>
                {categoriesIsFetching ? (
                    <CircularProgress/>
                ):(
                    <TextField
                        required
                        select
                        label="Category"
                        id="category"
                        name="category"
                        value={state.category}
                        onChange={inputChangeHandler}
                    >
                        <MenuItem value="" disabled>Select category</MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>
                        ))}
                    </TextField>
                )}
            </Grid>
            <Grid item>
                <TextField
                    required
                    label="Title"
                    id="title"
                    name="title"
                    value={state.title}
                    onChange={inputChangeHandler} />
            </Grid>
            <Grid item>
                <TextField
                    required
                    multiline
                    minRows={3}
                    label="Description"
                    id="description"
                    name="description"
                    value={state.description}
                    onChange={inputChangeHandler}
                />
            </Grid>
            <Grid item>
                <TextField
                    required
                    inputProps={{ min: "0" }}
                    type="number"
                    label="Price"
                    id="price"
                    name="price"
                    value={state.price}
                    onChange={inputChangeHandler}
                />
            </Grid>
            <Grid item>
                <FileInput
                    required
                    label="Image"
                    name="image"
                    onChange={fileInputChangeHandler}
                    showError={showError && !state.image}
                />
            </Grid>
            <Grid item>
                <LoadingButton
                    type="submit"
                    loading={isLoading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                >
                    <span>Save</span>
                </LoadingButton>
            </Grid>
        </Grid>
    );
};

export default ItemForm;