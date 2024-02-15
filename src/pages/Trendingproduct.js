import { useEffect, useState } from "react";
import { db } from "../components/firebase";
import { onValue, push, ref, remove, update } from "firebase/database";
import "../css/gems.css";
import Logout from "./Logout";

const Trendingproduct = () => {
  // soting data nodes in state
  const [trendingRecords, setTrendingRecords] = useState([]);

  // inintal data nodes
  const [newtrenData, setNewtrenData] = useState({
    trendingName: "",
    trendingWeight: "",
    trendingInStock: "",
    trendingPrice: "",
    trendingDescrition: "",
    trendingImage: null,
    trendingImageURL: "",
    trendingImagesub: null,
    trendingImagesubURL: "",
    trendingImagesubT: null,
    trendingImagesubURLT: "",
    trendingImagesubTH: null,
    trendingImagesubURLTH: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editRecordKey, setEditRecordKey] = useState("");
  // initall editable data storing
  const [editedtrendingData, setEditedtrendingData] = useState({
    trendingName: "",
    trendingWeight: "",
    trendingInStock: "",
    trendingPrice: "",
    trendingDescrition: "",
    trendingImage: null,
    trendingImageURL: "",
    trendingImagesub: null,
    trendingImagesubURL: "",
    trendingImagesubT: null,
    trendingImagesubURLT: "",
    trendingImagesubTH: null,
    trendingImagesubURLTH: "",
  });

  useEffect(() => {
    const trendRef = ref(db, "trendingProducts");
    onValue(trendRef, (snapshot) => {
      let records = [];

      snapshot.forEach((childSnapshot) => {
        let keyname = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyname, data: data });
      });
      setTrendingRecords(records);
    });
    // console.log(mineralRecords)
  }, []);

  const createNewRecord = () => {
    const specialRef = ref(db, "trendingProducts");
    push(specialRef, {
      ...newtrenData,
      trendingPrice: parseFloat(newtrenData.trendingPrice),
    })
      .then(() => {
        alert("New mineral record created successfully!");
        setNewtrenData({
          trendingName: "",
          trendingWeight: "",
          trendingInStock: "",
          trendingPrice: "",
          trendingDescrition: "",
          trendingImage: null,
          trendingImageURL: "",
          trendingImagesub: null,
          trendingImagesubURL: "",
          trendingImagesubT: null,
          trendingImagesubURLT: "",
          trendingImagesubTH: null,
          trendingImagesubURLTH: "",
        });
      })
      .catch((error) => {
        alert("Error creating mineral record: ", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewtrenData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewtrenData((prevData) => ({
          ...prevData,
          trendingImage: imageFile,
          trendingImageURL: reader.result,
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
        setNewtrenData((prevData) => ({
          ...prevData,
          trendingImagesub: imageFile,
          trendingImagesubURL: reader.result,
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
        setNewtrenData((prevData) => ({
          ...prevData,
          ImagesubT: imageFile,
          trendingImagesubURLT: reader.result,
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
        setNewtrenData((prevData) => ({
          ...prevData,
          trendingImagesubTH: imageFile,
          trendingImagesubURLTH: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const startEditing = (key, data) => {
    setEditMode(true);
    setEditRecordKey(key);
    setEditedtrendingData({
      ...data,
      trendingImageURL: data.trendingImageURL,
      trendingImagesubURL: data.trendingImagesubURL,
      trendingImagesubURLT: data.trendingImagesubURLT,
      trendingImagesubURLTH: data.trendingImagesubURLTH,
    });
  };

  const saveEditedRecord = () => {
    const trendRef = ref(db, `trendingProducts/${editRecordKey}`);
    update(trendRef, editedtrendingData)
      .then(() => {
        console.log("Mineral record updated successfully!");
        setEditMode(false);
        setEditRecordKey("");
        setEditedtrendingData({
          trendingName: "",
          trendingWeight: "",
          trendingInStock: "",
          trendingPrice: "",
          trendingDescrition: "",
          trendingImage: null,
          trendingImageURL: "",
          trendingImagesub: null,
          trendingImagesubURL: "",
          trendingImagesubT: null,
          trendingImagesubURLT: "",
          trendingImagesubTH: null,
          trendingImagesubURLTH: "",
        });
      })
      .catch((error) => {
        console.error("Error updating offer record: ", error);
      });
  };

  const cancelEditing = () => {
    setEditMode(false);
    setEditRecordKey("");
    setEditedtrendingData({
      trendingName: "",
      trendingWeight: "",
      trendingInStock: "",
      trendingPrice: "",
      trendingDescrition: "",
      trendingImage: null,
      trendingImageURL: "",
      trendingImagesub: null,
      trendingImagesubURL: "",
      trendingImagesubT: null,
      trendingImagesubURLT: "",
      trendingImagesubTH: null,
      trendingImagesubURLTH: "",
    });
  };

  const deleteRecord = (key) => {
    const trendRef = ref(db, `trendingProducts/${key}`);
    remove(trendRef)
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
        <h1>Trending Items Dashboard</h1>

        {/* Input form to create new mineral records */}
        <div>
          <h2>Create New Trending</h2>
          <div>
            <div className="lablesFLex">
              <label>
                Trending item Name : <br />
                <input
                  type="text"
                  name="trendingName"
                  value={newtrenData.trendingName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Trending item Weight : <br />
                <input
                  type="text"
                  name="trendingWeight"
                  value={newtrenData.trendingWeight}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="lablesFLex">
              <label>
                Trending item InStock : <br />
                <input
                  type="text"
                  name="trendingInStock"
                  value={newtrenData.trendingInStock}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Trending item Price : <br />
                <input
                  type="number"
                  name="trendingPrice"
                  value={newtrenData.trendingPrice}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="lablesFLex">
              <label>
                Trending item Descrition : <br />
                <input
                  type="text"
                  name="trendingDescrition"
                  value={newtrenData.trendingDescrition}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Trending Itme Main Image : <br />
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

              <button onClick={createNewRecord}>Create Trend Item</button>
            </div>
          </div>
        </div>
      </div>
      {/* Display existing mineral records */}
      <div>
        <div className="inputSectioncreate">
          <h2>Existing Trending Items</h2>
          <div>
            {trendingRecords.map((record) => (
              <div key={record.key}>
                {/* Display mineral details and image */}
                {editMode && editRecordKey === record.key ? (
                  <div className=" stockitem">
                    <div className="parentGrid ">
                      <div>
                        <label>
                          Trending Item Name : <br />
                          <input
                            type="text"
                            name="trendingName"
                            value={editedtrendingData.trendingName}
                            onChange={(e) =>
                              setEditedtrendingData((prevData) => ({
                                ...prevData,
                                trendingName: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Trending Item Weight : <br />
                          <input
                            type="text"
                            name="trendingWeight"
                            value={editedtrendingData.trendingWeight}
                            onChange={(e) =>
                              setEditedtrendingData((prevData) => ({
                                ...prevData,
                                trendingWeight: e.target.value,
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
                            name="trendingInStock"
                            value={editedtrendingData.trendingInStock}
                            onChange={(e) =>
                              setEditedtrendingData((prevData) => ({
                                ...prevData,
                                trendingInStock: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Trending Item Price : <br />
                          <input
                            type="text"
                            name="trendingPrice"
                            value={editedtrendingData.trendingPrice}
                            onChange={(e) =>
                              setEditedtrendingData((prevData) => ({
                                ...prevData,
                                trendingPrice: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Trending Description : <br />
                          <input
                            type="text"
                            name="trendinDgescrition"
                            value={editedtrendingData.trendingDescrition}
                            onChange={(e) =>
                              setEditedtrendingData((prevData) => ({
                                ...prevData,
                                trendingDescrition: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Trending Main Image:
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Trending Sub Image:
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChangesub}
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Trending Sub Image:
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChangesub2}
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Trending Sub Image:
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
                        Trending Item Name : <br />
                        {record.data.trendingName}
                      </div>
                      <div>
                        Trending Item Weight : <br /> {record.data.trendingWeight}
                      </div>
                      <div>
                        Trending Item InStock : <br />{" "}
                        {record.data.trendingInStock}
                      </div>
                      <div>
                        Trending Item Price : <br /> {record.data.trendingPrice}
                      </div>
                     
                      <div>
                        Trending Item Descrition : <br />{" "}
                        {record.data.trendingDescrition}
                      </div>

                      <div>
                        {record.data.trendingImageURL && (
                          <img
                            src={record.data.trendingImageURL}
                            alt={`specialOffer: ${record.data.trendingName}`}
                          />
                        )}
                      </div>

                      <div>
                        {record.data.trendingImagesubURL && (
                          <img
                            src={record.data.trendingImagesubURL}
                            alt={`trendingProducts: ${record.data.trendingName}`}
                          />
                        )}
                      </div>
                      <div>
                        {record.data.trendingImagesubURLT && (
                          <img
                            src={record.data.trendingImagesubURLT}
                            alt={`trendingProducts: ${record.data.trendingName}`}
                          />
                        )}
                      </div>
                      <div>
                        {record.data.trendingImagesubURLTH && (
                          <img
                            src={record.data.trendingImagesubURLTH}
                            alt={`trendingProducts: ${record.data.trendingName}`}
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

export default Trendingproduct;
