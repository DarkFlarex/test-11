import {Alert, CircularProgress, Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCategories} from "../categories/categoriesSlice";
import CategoriesMenu from "../categories/components/CategoriesMenu";
import {useEffect} from "react";
import {fetchCategories} from "../categories/categoriesThunks";
import {selectItems, selectItemsFetching} from "./itemsSlice";
import {useParams} from "react-router-dom";
import {fetchItems} from "./itemsThunks";
import Itemitem from "./components/Itemitem";


const Items = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectItems);
    const categories = useAppSelector(selectCategories);
    const isFetching = useAppSelector(selectItemsFetching);
    const {categoryId} = useParams();

    useEffect(() => {
        dispatch(fetchItems(categoryId));
        dispatch(fetchCategories());
    }, [dispatch,categoryId]);

    let content:React.ReactNode = <Alert severity="info" sx={{width: '100%'}}>There are no Items here!</Alert>;

    if(isFetching) {
        content = <CircularProgress/>;
    } else if (items.length > 0) {
        content = items.map((item) => (
            <Itemitem
                key={item._id}
                _id={item._id}
                title={item.title}
                price={item.price}
                image={item.image}
            />
        ));
    }

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
                <Grid item container spacing={1}>
                    {content}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Items;