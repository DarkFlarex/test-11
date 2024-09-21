import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectItemCreate} from "./itemsSlice";
import {ItemMutation} from "../../types";
import {createItem} from "./itemsThunks";
import {Typography} from "@mui/material";
import ItemForm from "./components/ItemForm";

const NewItem = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isCreating = useAppSelector(selectItemCreate);

    const onFormSubmit = async (itemMutation: ItemMutation) => {
        try{
            await dispatch(createItem(itemMutation));
            navigate('/');
        } catch (error){
            console.error('Create item error:', error);
        }
    };

    return (
        <>
            <Typography variant="h4" sx={{ mb: 2 }}>
                New product
            </Typography>
            <ItemForm onSubmit={onFormSubmit} isLoading={isCreating} />
        </>
    );
};

export default NewItem;