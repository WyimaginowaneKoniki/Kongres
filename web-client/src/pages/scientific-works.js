import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import ScientificWorksOneWork from '../components/ScientificWorksOneWork'
import ScientificWorksCategories from '../components/ScientificWorksCategories'
import ScientificWorksRecentAuthors from '../components/ScientificWorksRecentAuthors'
import Search from '../components/Search'
import picture from '../images/empty-image.png'

function ScientificWorks(props) {
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

    const works = [
        {
            title: 'Importance of Golden Ratio in Mathematics',
            categories: 'Mathematics',
            data: '30/11/2020',
            authors: 'John Doe, Sam Smith, Ashley Blue',
            text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place. ',
        },
        {
            title: 'Importance of Golden Ratio in Mathematics',
            categories: 'Mathematics',
            data: '30/11/2020',
            authors: 'John Doe, Sam Smith, Ashley Blue',
            text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place. ',
        },
        {
            title: 'Importance of Golden Ratio in Mathematics',
            categories: 'Mathematics',
            data: '30/11/2020',
            authors: 'John Doe, Sam Smith, Ashley Blue',
            text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place. ',
        }
    ];

    const workList = works.map(work =>
        <ScientificWorksOneWork
            title = {work.title}
            categories = {work.categories}
            data = {work.data}
            authors = {work.authors}
            text = {work.text}
            link = {work.link}
        />
    )

    const categories = ['Mathematics', 'Technology', 'Computer Science'];
    const categoryList = categories.map(name => <ScientificWorksCategories name = {name}/>)

    const recents = [
        {
            path: picture,
            alternativeText: 'Photo John Doe',
            name: 'John Doe',
            description: 'Academic title or Work title...',
        },
        {
            path: picture,
            alternativeText: 'Photo John Doe',
            name: 'John Doe',
            description: 'Title',
        },
        {
            path: picture,
            alternativeText: 'Photo John Doe',
            name: 'John Doe',
            description: 'Title',
        },
        {
            path: picture,
            alternativeText: 'Photo John Doe',
            name: 'John Doe',
            description: 'Title',
        }
    ];
    
    const recentList = recents.map(recent =>
        <ScientificWorksRecentAuthors
            path = {recent.path}
            alternativeText = {recent.alternativeText}
            name = {recent.name}
            description = {recent.description}
        />
    )

    return(
        <div className={style.main}>
          <h1>Scientific works</h1>

          <div className={style.left}>
            {workList}
          </div>

          <div className={style.right}>
            <Search/>

            <h3 className={style.h3}>Categories</h3>
            {categoryList}

            <h3 className={style.h3}>Recent authors / works</h3>
            {recentList}
          </div>
        </div>
    );
}

export default ScientificWorks;