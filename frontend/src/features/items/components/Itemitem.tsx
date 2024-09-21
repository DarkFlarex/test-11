import {Card, CardContent, CardMedia, Grid, styled} from "@mui/material";
import React from 'react';
import {API_URL} from "../../../constants";
import {Link} from "react-router-dom";

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

const StyledLink = styled(Link)({
    color: 'inherit',
    textDecoration: 'none',
});

interface Props {
    _id: string;
    title: string;
    price: number;
    image: string;
}

const Itemitem: React.FC<Props> = ({ _id, title, price, image }) => {
    let cardImage;

    if (image) {
        cardImage = `${API_URL}/${image}`;
    }
    return (
        <Grid item sx={{ width: '300px' }}>
            <StyledLink to={`/items/${_id}`}>
                <Card sx={{height: '100%'}}>
                    <ImageCardMedia image={cardImage} title={title}/>
                    <CardContent>
                        <h4>{title}</h4>
                    </CardContent>
                    <CardContent>
                        <span>{price}</span>
                    </CardContent>
                </Card>
            </StyledLink>
        </Grid>
    );
};

export default Itemitem;