import React from "react";
import "../App.css";
import Gallery from "react-photo-gallery";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import Photo from "../components/Photo";
import photos from "../photos";
import arrayMove from "array-move";
import { makeStyles } from "@material-ui/core/styles";

const SortablePhoto = SortableElement((item) => <Photo {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
  <Gallery
    photos={items}
    renderImage={(props) => <SortablePhoto {...props} />}
  />
));

export default function PhotoGallery() {
  const style = makeStyles({
    container: {
      width: "1000px",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
  })();

  const [items, setItems] = React.useState(photos);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <div>
      <h1>Gallery</h1>
      <div className={style.container}>
        <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
      </div>
    </div>
  );
}
