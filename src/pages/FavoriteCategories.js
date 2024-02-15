import { useEffect, useState } from "react";
import { db } from "../components/firebase";
import { onValue, push, ref, remove, update } from "firebase/database";
import "../css/gems.css";
import Logout from "./Logout";

 const FavoriteCategories = () => {
  // soting data nodes in state
  const [favoriteRecords, setFavoriteRecords] = useState([]);

  // inintal data nodes
  const [newfavoriteData, setNewfavoriteData] = useState({
    favoriteName: "",
    favoriteWeight: "",
    favoriteInStock: "",
    favoritePrice: "",
    favoriteDescrition: "",
    favoriteImage: null,
    favoriteImageURL: "",
    favoriteImagesub: null,
    favoriteImagesubURL: "",
    favoriteImagesubT: null,
    favoriteImagesubURLT: "",
    favoriteImagesubTH: null,
    favoriteImagesubURLTH: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editRecordKey, setEditRecordKey] = useState("");
  // initall editable data storing
  const [editedfavoriteData, setEditedFavoriteData] = useState({
    favoriteName: "",
    favoriteWeight: "",
    favoriteInStock: "",
    favoritePrice: "",
    favoriteDescrition: "",
    favoriteImage: null,
    favoriteImageURL: "",
    favoriteImagesub: null,
    favoriteImagesubURL: "",
    favoriteImagesubT: null,
    favoriteImagesubURLT: "",
    favoriteImagesubTH: null,
    favoriteImagesubURLTH: "",
  });

  useEffect(() => {
    const favoriteRef = ref(db, "favoriteCategories");
    onValue(favoriteRef, (snapshot) => {
      let records = [];

      snapshot.forEach((childSnapshot) => {
        let keyname = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyname, data: data });
      });
      setFavoriteRecords(records);
    });
    // console.log(mineralRecords)
  }, []);

  const createNewRecord = () => {
    const favoriteRef = ref(db, "favoriteCategories");
    push(favoriteRef, {
      ...newfavoriteData,
      favoritePrice: parseFloat(newfavoriteData.favoritePrice),
    })
      .then(() => {
        alert("New mineral record created successfully!");
        setNewfavoriteData({
          favoriteName: "",
          favoriteWeight: "",
          favoriteInStock: "",
          favoritePrice: "",
          favoriteDescrition: "",
          favoriteImage: null,
          favoriteImageURL: "",
          favoriteImagesub: null,
          favoriteImagesubURL: "",
          favoriteImagesubT: null,
          favoriteImagesubURLT: "",
          favoriteImagesubTH: null,
          favoriteImagesubURLTH: "",
        });
      })
      .catch((error) => {
        alert("Error creating mineral record: ", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewfavoriteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewfavoriteData((prevData) => ({
          ...prevData,
          favoriteImage: imageFile,
          favoriteImageURL: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleImageChangesub = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewfavoriteData((prevData) => ({
          ...prevData,
          favoriteImagesub: imageFile,
          favoriteImagesubURL: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleImageChangesub2 = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewfavoriteData((prevData) => ({
          ...prevData,
          ImagesubT: imageFile,
          favoriteImagesubURLT: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleImageChangesub3 = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewfavoriteData((prevData) => ({
          ...prevData,
          favoriteImagesubTH: imageFile,
          favoriteImagesubURLTH: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const startEditing = (key, data) => {
    setEditMode(true);
    setEditRecordKey(key);
    setEditedFavoriteData({
      ...data,
      favoriteImageURL: data.favoriteImageURL,
      favoriteImagesubURL: data.favoriteImagesubURL,
      favoriteImagesubURLT: data.favoriteImagesubURLT,
      favoriteImagesubURLTH: data.favoriteImagesubURLTH,
    });
  };

  const saveEditedRecord = () => {
    const favoriteRef = ref(db, `favoriteCategories/${editRecordKey}`);
    update(favoriteRef, editedfavoriteData)
      .then(() => {
        console.log("Mineral record updated successfully!");
        setEditMode(false);
        setEditRecordKey("");
        setEditedFavoriteData({
          favoriteName: "",
          favoriteWeight: "",
          favoriteInStock: "",
          favoritePrice: "",
          favoriteDescrition: "",
          favoriteImage: null,
          favoriteImageURL: "",
          favoriteImagesub: null,
          favoriteImagesubURL: "",
          favoriteImagesubT: null,
          favoriteImagesubURLT: "",
          favoriteImagesubTH: null,
          favoriteImagesubURLTH: "",
        });
      })
      .catch((error) => {
        console.error("Error updating offer record: ", error);
      });
  };

  const cancelEditing = () => {
    setEditMode(false);
    setEditRecordKey("");
    setEditedFavoriteData({
      favoriteName: "",
      favoriteWeight: "",
      favoriteInStock: "",
      favoritePrice: "",
      favoriteDescrition: "",
      favoriteImage: null,
      favoriteImageURL: "",
      favoriteImagesub: null,
      favoriteImagesubURL: "",
      favoriteImagesubT: null,
      favoriteImagesubURLT: "",
      favoriteImagesubTH: null,
      favoriteImagesubURLTH: "",
    });
  };

  const deleteRecord = (key) => {
    const favoriteRef = ref(db, `favoriteCategories/${key}`);
    remove(favoriteRef)
      .then(() => {
        console.log("offer record deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting offer record: ", error);
      });
  };

  return (
    <div className="Dashboardconatainer">
      <div className="logperson">
        <p className="Toptext">
          <Logout />
        </p>
      </div>
      <div className="inputSectioncreate">
        <h1>Favorite Items Dashboard</h1>

        {/* Input form to create new mineral records */}
        <div>
          <h2>Create New Favorite</h2>
          <div>
            <div className="lablesFLex">
              <label>
                Favorite item Name : <br />
                <input
                  type="text"
                  name="favoriteName"
                  value={newfavoriteData.favoriteName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Favorite item Weight : <br />
                <input
                  type="text"
                  name="favoriteWeight"
                  value={newfavoriteData.favoriteWeight}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="lablesFLex">
              <label>
                Favorite item InStock : <br />
                <input
                  type="text"
                  name="favoriteInStock"
                  value={newfavoriteData.favoriteInStock}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Favorite item Price : <br />
                <input
                  type="number"
                  name="favoritePrice"
                  value={newfavoriteData.favoritePrice}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="lablesFLex">
              <label>
                Favorite item Descrition : <br />
                <input
                  type="text"
                  name="favoriteDescrition"
                  value={newfavoriteData.favoriteDescrition}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Favorite Itme Main Image : <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="lablesFLex">
              <label>
                Sub Image : <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChangesub}
                />
              </label>
              <label>
                Sub Image : <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChangesub2}
                />
              </label>
            </div>
            <div className="lablesFLex">
              <label>
                Sub Image : <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChangesub3}
                />
              </label>

              <button onClick={createNewRecord}>create Favorite Item</button>
            </div>
          </div>
        </div>
      </div>
      {/* Display existing mineral records */}
      <div>
        <div className="inputSectioncreate">
          <h2>Existing Favorite Items</h2>
          <div>
            {favoriteRecords.map((record) => (
              <div key={record.key}>
                {/* Display mineral details and image */}
                {editMode && editRecordKey === record.key ? (
                  <div className=" stockitem">
                    <div className="parentGrid ">
                      <div>
                        <label>
                          Favorite Item Name : <br />
                          <input
                            type="text"
                            name="favoriteName"
                            value={editedfavoriteData.favoriteName}
                            onChange={(e) =>
                              setEditedFavoriteData((prevData) => ({
                                ...prevData,
                                favoriteName: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Favorite Item Weight : <br />
                          <input
                            type="text"
                            name="favoriteWeight"
                            value={editedfavoriteData.favoriteWeight}
                            onChange={(e) =>
                              setEditedFavoriteData((prevData) => ({
                                ...prevData,
                                favoriteWeight: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          In Stock : <br />
                          <input
                            type="text"
                            name="favoriteInStock"
                            value={editedfavoriteData.favoriteInStock}
                            onChange={(e) =>
                              setEditedFavoriteData((prevData) => ({
                                ...prevData,
                                favoriteInStock: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Favorite Item Price : <br />
                          <input
                            type="text"
                            name="favoritePrice"
                            value={editedfavoriteData.favoritePrice}
                            onChange={(e) =>
                              setEditedFavoriteData((prevData) => ({
                                ...prevData,
                                favoritePrice: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Favorite Description : <br />
                          <input
                            type="text"
                            name="favoriteDescrition"
                            value={editedfavoriteData.favoriteDescrition}
                            onChange={(e) =>
                              setEditedFavoriteData((prevData) => ({
                                ...prevData,
                                favoriteDescrition: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Favorite Main Image:
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Favorite Sub Image:
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChangesub}
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Favorite Sub Image:
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChangesub2}
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Favorite Sub Image:
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChangesub3}
                          />
                        </label>
                      </div>
                    </div>
                    <button onClick={saveEditedRecord}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </div>
                ) : (
                  <div className="stockitem">
                    <div className="parentGrid">
                      <div>
                        Favorite Item Name : <br />
                        {record.data.favoriteName}
                      </div>
                      <div>
                        Favorite Item Weight : <br /> {record.data.favoriteWeight}
                      </div>
                      <div>
                        Favorite Item InStock : <br />{" "}
                        {record.data.favoriteInStock}
                      </div>
                      <div>
                        Favorite Item Price : <br /> {record.data.favoritePrice}
                      </div>
                     
                      <div>
                        Favorite Item Descrition : <br />{" "}
                        {record.data.favoriteDescrition}
                      </div>

                      <div>
                        {record.data.favoriteImageURL && (
                          <img
                            src={record.data.favoriteImageURL}
                            alt={`favoriteCategories: ${record.data.favoriteName}`}
                          />
                        )}
                      </div>

                      <div>
                        {record.data.favoriteImagesubURL && (
                          <img
                            src={record.data.favoriteImagesubURL}
                            alt={`favoriteCategories: ${record.data.favoriteName}`}
                          />
                        )}
                      </div>
                      <div>
                        {record.data.favoriteImagesubURLT && (
                          <img
                            src={record.data.favoriteImagesubURLT}
                            alt={`favoriteCategories: ${record.data.favoriteName}`}
                          />
                        )}
                      </div>
                      <div>
                        {record.data.favoriteImagesubURLTH && (
                          <img
                            src={record.data.favoriteImagesubURLTH}
                            alt={`favoriteCategories: ${record.data.favoriteName}`}
                          />
                        )}
                      </div>
                    </div>
                    <div className="editBtn">
                      <button
                        onClick={() => startEditing(record.key, record.data)}
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteRecord(record.key)}>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default FavoriteCategories