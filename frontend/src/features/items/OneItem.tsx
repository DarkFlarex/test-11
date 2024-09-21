import {useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import { selectOneItem, selectOneItemFetching} from "./itemsSlice";
import {deleteItem, fetchOneItem} from "./itemsThunks";
import {Button, CardMedia, CircularProgress, Grid, IconButton, styled, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {API_URL} from "../../constants";
import {fetchCategories} from "../categories/categoriesThunks";
import DeleteIcon from "@mui/icons-material/Delete";
import {selectUser} from "../users/usersSlice";

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

const OneItem = () => {
    const navigate = useNavigate();
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const item = useAppSelector(selectOneItem);
    const isFetching = useAppSelector(selectOneItemFetching);
    const user = useAppSelector(selectUser);


    const cardImage = `${API_URL}/${item?.image}`;

    useEffect(() => {
        dispatch(fetchOneItem(id));
        dispatch(fetchCategories());
    }, [dispatch, id]);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this Item?')) {
            navigate('/');
            dispatch(deleteItem(id));
        }
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Button variant="text" startIcon={<ArrowBackIcon/>} component={Link} to={'/'}>
                    Back to products
                </Button>
                {user && item?.user._id === user._id && (
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                )}

            </Grid>
            {isFetching && (
                <Grid item>
                    <CircularProgress />
                </Grid>
            )}
            {item && (
                <Grid>
                    <Grid item component={Typography} variant="h4">
                        {item.title}
                    </Grid>
                    <Grid item component={Typography} variant="body1">
                        Description: {item.description}
                    </Grid>
                    <Grid item component={Typography} variant="h6">
                        Price: {item.price} KGS
                    </Grid>
                    <Grid item component={Typography} variant="h6">
                        Category: {item.category.title}
                    </Grid>
                    <Grid > Seller: {item.user.displayName}</Grid>

                    <Grid >   Phone: {item.user.phoneNumber}</Grid>
                    <Grid item component={Typography} variant="h6">
                        <ImageCardMedia image={cardImage} title={item.title}/>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default OneItem;