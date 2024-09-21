import {Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCategories} from "../categories/categoriesSlice";
import CategoriesMenu from "../categories/components/CategoriesMenu";
import {useEffect} from "react";
import {fetchCategories} from "../categories/categoriesThunks";


const Products = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);


    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
    return (
        <Grid container spacing={2}>
            <Grid item sx={{widht: 200}}>
                <CategoriesMenu categories={categories}/>
            </Grid>
            <Grid item xs container direction="column" spacing={2}>
                <Grid item container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h4">All items</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Products;