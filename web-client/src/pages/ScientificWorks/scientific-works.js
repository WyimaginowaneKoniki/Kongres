import React, { useState, useEffect } from 'react';
import "../../App.css";
import { makeStyles } from '@material-ui/core/styles';
import ScientificWorksOneWork from '../../components/ScientificWorksOneWork'
import ScientificWorksCategories from '../../components/ScientificWorksCategories'
import ScientificWorksRecentAuthors from '../../components/ScientificWorksRecentAuthors'
import Search from '../../components/Search'
import picture from '../../images/empty-image.png';
import axios from "axios";
import { URL_API } from "../../Constants";

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

    // Stores works
    const [works, SetWorks] = useState([{
        title: null,
        categories: null,
        date: null,
        authors: null,
        description: null
    }]);

    // base on:
    // https://www.robinwieruch.de/react-hooks-fetch-data

    // GET request
    useEffect(() => {
        // without fetchData function, the console returns error
        // because it must be async
      const fetchData = async () => {
        var token = localStorage.getItem("jwt");
        await axios
          .get(`${URL_API}/ScientificWork`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((resp) => {
            SetWorks(resp.data);
          });
      };
      fetchData();
    }, []);

    // convert date from ISO [YYYY-MM-DDTHH:mm:ss.sssZ] to DD/MM/YYYY
    const convertDate = (date) => {
        date = date?.substring(0,10);
        if(!date)
            return null;
        return date.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function(match,y,m,d) { 
            return d + '/' + m + '/' + y;  
        })
    };

    const workList = works.map((work) => (
      <ScientificWorksOneWork
        title={work.title}
        categories={work.specialization}
        date={convertDate(work.creationDate)}
        authors={work.authors}
        text={work.description}
        id={work.id}
      />
    ));

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
          {/* If list of works is null, then nothing is displayed */}
            {works[0]?.title ? workList : null}
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