import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import MyReviewsOneReview from '../components/MyReviewsOneReview'
import MyReviewsCategories from '../components/MyReviewsCategories'
import Search from '../components/Search'
import picture from '../images/empty-image.png'

function MyReviews(props) {
    const styles = makeStyles({
        main:
        {
            width: '80%',
            margin: 'auto',
        },
        left:
        {
            paddingTop: '5%',
            width: '65%', 
            float: 'left',
        },
        right:
        {
            paddingTop: '5%',
            width: '35%',
            float: 'right',
        },
        h3:
        {
            paddingTop: '5%',
            width: '100%',
            float: 'left',
            textAlign: 'left',
            paddingLeft: '5%',
        }
    });

    const style = styles();

    const reviews = [
        {
            title: 'Importance of Golden Ratio in Mathematics',
            categories: 'Mathematics',
            data: '30/11/2020',
            authors: 'John Doe, Sam Smith, Ashley Blue',
            text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place. ',
            path: picture,
            author: 'John Doe',
            modificationDate: '12/12/2020',
        },
        {
            title: 'Importance of Golden Ratio in Mathematics',
            categories: 'Mathematics',
            data: '30/11/2020',
            authors: 'John Doe, Sam Smith, Ashley Blue',
            text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place. ',
            path: picture,
            author: 'John Doe',
            modificationDate: '12/12/2020',
        },
        {
            title: 'Importance of Golden Ratio in Mathematics',
            categories: 'Mathematics',
            data: '30/11/2020',
            authors: 'John Doe, Sam Smith, Ashley Blue',
            text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place. ',
            path: picture,
            author: 'John Doe',
            modificationDate: '12/12/2020',
        },
    ];

    const reviewList = reviews.map(review =>
        <MyReviewsOneReview
            title = {review.title}
            categories = {review.categories}
            data = {review.data}
            authors = {review.authors}
            text = {review.text}
            link = {review.link}
            path = {review.path}
            author = {review.author}
            modificationDate = {review.modificationDate}
        />
    )

    const status = ['Waiting for review', 'Reviewed', 'Ended', 'Accepted', 'Rejected'];
    const statusList = status.map(name => <MyReviewsCategories name = {name}/>)

    return(
        <div className={style.main}>
          <h1>My reviews</h1>

          <div className={style.left}>
            {reviewList}
          </div>

          <div className={style.right}>
            <Search/>

            <h3 className={style.h3}>Status</h3>
            {statusList}

          </div>
        </div>
    );
}

export default MyReviews;