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

    const work1 = {
        title: 'Importance of Golden Ratio in Mathematics',
        categories: 'Mathematics',
        data: '30/11/2020',
        authors: 'John Doe, Sam Smith, Ashley Blue',
        text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place. ',
    };

    const work2 = {
        title: 'Importance of Golden Ratio in Mathematics',
        categories: 'Mathematics',
        data: '30/11/2020',
        authors: 'John Doe, Sam Smith, Ashley Blue',
        text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place. ',
    };

    const work3 = {
        title: 'Importance of Golden Ratio in Mathematics',
        categories: 'Mathematics',
        data: '30/11/2020',
        authors: 'John Doe, Sam Smith, Ashley Blue',
        text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place. ',
    };

    const categories = ['Mathematics', 'Technology', 'Computer Science'];
    const categoryList = categories.map(name => <ScientificWorksCategories name = {name}/>)

    const recent1 = {
        path: picture,
        alternativeText: 'Photo John Doe',
        name: 'John Doe',
        description: 'Academic title or Work title...',
    }

    const recent2 = {
        path: picture,
        alternativeText: 'Photo John Doe',
        name: 'John Doe',
        description: 'Title',
    }

    const recent3 = {
        path: picture,
        alternativeText: 'Photo John Doe',
        name: 'John Doe',
        description: 'Title',
    }

    const recent4 = {
        path: picture,
        alternativeText: 'Photo John Doe',
        name: 'John Doe',
        description: 'Title',
    }

    return(
        <div className={style.main}>
          <h1>Scientific works</h1>

          <div className={style.left}>
            <ScientificWorksOneWork
                title = {work1.title}
                categories = {work1.categories}
                data = {work1.data}
                authors = {work1.authors}
                text = {work1.text}
                link = {work1.link}
            />
            <ScientificWorksOneWork
                title = {work2.title}
                categories = {work2.categories}
                data = {work2.data}
                authors = {work2.authors}
                text = {work2.text}
                link = {work2.link}
            />
            <ScientificWorksOneWork
                title = {work3.title}
                categories = {work3.categories}
                data = {work3.data}
                authors = {work3.authors}
                text = {work3.text}
                link = {work3.link}
            />
          </div>

          <div className={style.right}>
            <Search/>

            <h3 className={style.h3}>Categories</h3>
            {categoryList}

            <h3 className={style.h3}>Recent authors / works</h3>
            <ScientificWorksRecentAuthors
                path = {recent1.path}
                alternativeText = {recent1.alternativeText}
                name = {recent1.name}
                description = {recent1.description}
            />

            <ScientificWorksRecentAuthors
                path = {recent2.path}
                alternativeText = {recent2.alternativeText}
                name = {recent2.name}
                description = {recent2.description}
            />

            <ScientificWorksRecentAuthors
                path = {recent3.path}
                alternativeText = {recent3.alternativeText}
                name = {recent3.name}
                description = {recent3.description}
            />

            <ScientificWorksRecentAuthors
                path = {recent4.path}
                alternativeText = {recent4.alternativeText}
                name = {recent4.name}
                description = {recent4.description}
            />
          </div>
        </div>
    );
}

export default ScientificWorks;