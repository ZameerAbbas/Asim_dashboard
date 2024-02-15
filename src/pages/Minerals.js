import { useEffect, useState } from "react";
import { db } from "../components/firebase";
import { onValue, push, ref, remove, update } from "firebase/database";
import "../css/gems.css";
import Logout from "./Logout";

const MineralsDashboard = () => {
  const [mineralRecords, setMineralRecords] = useState([]);
  const [newMineralData, setNewMineralData] = useState({
    mineralName: "",
    mineralWeight: "",
    mineralInStock: "",
    mineralPrice: "",
    mineralDescrition: "",
    mineralImage: null,
    mineralImageURL: "",
    mineralImagesub: null,
    mineralImagesubURL: "",
    mineralImagesubT: null,
    mineralImagesubURLT: "",
    mineralImagesubTH: null,
    mineralImagesubURLTH: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editRecordKey, setEditRecordKey] = useState("");
  const [editedMineralData, setEditedMineralData] = useState({
    mineralName: "",
    mineralWeight: "",
    mineralInStock: "",
    mineralPrice: "",
    mineralDescrition: "",
    mineralImage: null,
    mineralImageURL: "",
    mineralImagesub: null,
    mineralImagesubURL: "",
    mineralImagesubT: null,
    mineralImagesubURLT: "",
    mineralImagesubTH: null,
    mineralImagesubURLTH: "",
  });

  useEffect(() => {
    const mineralsRef = ref(db, "minerals");
    onValue(mineralsRef, (snapshot) => {
      let records = [];

      snapshot.forEach((childSnapshot) => {
        let keyname = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyname, data: data });
      });
      setMineralRecords(records);
      
    });
    // console.log(mineralRecords)
  }, []);

  const createNewRecord = () => {
    const mineralsRef = ref(db, "minerals");
    push(mineralsRef, {
      ...newMineralData,
      mineralPrice: parseFloat(newMineralData.mineralPrice),
    })
      .then(() => {
        alert("New mineral record created successfully!");
        setNewMineralData({
          mineralName: "",
          mineralWeight: "",
          mineralInStock: "",
          mineralPrice: "",
          mineralDescrition: "",
          mineralImage: null,
          mineralImageURL: "",
          mineralImagesubT: null,
          mineralImagesubURLT: "",
          mineralImagesubTH: null,
          mineralImagesubURLTH: "",
        });
      })
      .catch((error) => {
        alert("Error creating mineral record: ", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMineralData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewMineralData((prevData) => ({
          ...prevData,
          mineralImage: imageFile,
          mineralImageURL: reader.result,
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
        setNewMineralData((prevData) => ({
          ...prevData,
          mineralImagesub: imageFile,
          mineralImagesubURL: reader.result,
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
        setNewMineralData((prevData) => ({
          ...prevData,
          mineralImagesubT: imageFile,
          mineralImagesubURLT: reader.result,
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
        setNewMineralData((prevData) => ({
          ...prevData,
          mineralImagesubTH: imageFile,
          mineralImagesubURLTH: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const startEditing = (key, data) => {
    setEditMode(true);
    setEditRecordKey(key);
    setEditedMineralData({
      ...data,
      mineralImageURL: data.mineralImageURL,
      mineralImagesubURL: data.mineralImagesubURL,
      mineralImagesubURLT: data.mineralImagesubURLT,
      mineralImagesubURLTH: data.mineralImagesubURLTH,
    });
  };

  const saveEditedRecord = () => {
    const mineralsRef = ref(db, `minerals/${editRecordKey}`);
    update(mineralsRef, editedMineralData)
      .then(() => {
        console.log("Mineral record updated successfully!");
        setEditMode(false);
        setEditRecordKey("");
        setEditedMineralData({
          mineralName: "",
          mineralWeight: "",
          mineralInStock: "",
          mineralPrice: "",
          mineralDescrition: "",
          mineralImage: null,
          mineralImageURL: "",
          mineralImagesub: null,
          mineralImagesubURL: "",
          mineralImagesubT: null,
          mineralImagesubURLT: "",
          mineralImagesubTH: null,
          mineralImagesubURLTH: "",
        });
      })
      .catch((error) => {
        console.error("Error updating mineral record: ", error);
      });
  };

  const cancelEditing = () => {
    setEditMode(false);
    setEditRecordKey("");
    setEditedMineralData({
      mineralName: "",
      mineralWeight: "",
      mineralInStock: "",
      mineralPrice: "",
      mineralDescrition: "",
      mineralImage: null,
      mineralImageURL: "",
      mineralImagesub: null,
      mineralImagesubURL: "",
      mineralImagesubT: null,
      mineralImagesubURLT: "",
      mineralImagesubTH: null,
      mineralImagesubURLTH: "",
    });
  };

  const deleteRecord = (key) => {
    const mineralsRef = ref(db, `minerals/${key}`);
    remove(mineralsRef)
      .then(() => {
        console.log("Mineral record deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting mineral record: ", error);
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
        <h1>Minerals Dashboard</h1>

        {/* Input form to create new mineral records */}
        <div>
          <h2>Create New Mineral</h2>
          <div>
            <div className="lablesFLex">
              <label>
                Mineral Name : <br />
                <input
                  type="text"
                  name="mineralName"
                  value={newMineralData.mineralName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Mineral Weight : <br />
                <input
                  type="text"
                  name="mineralWeight"
                  value={newMineralData.mineralWeight}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="lablesFLex">
              <label>
                Mineral InStock : <br />
                <input
                  type="text"
                  name="mineralInStock"
                  value={newMineralData.mineralInStock}
                  onChange={handleInputChange}
                  
                />
              </label>
              <label>
                Mineral Price : <br />
                <input
                  type="number"
                  name="mineralPrice"
                  value={newMineralData.mineralPrice}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="lablesFLex">
              <label>
                Mineral Descrition : <br />
                <input
                  type="text"
                  name="mineralDescrition"
                  value={newMineralData.mineralDescrition}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Mineral Image : <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="lablesFLex">
              <label>
                Mineral Image : <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChangesub}
                />
              </label>
              <label>
                Mineral Image : <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChangesub2}
                />
              </label>
            </div>
            <div className="lablesFLex">
              <label>
                Mineral Image : <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChangesub3}
                />
              </label>

              <button onClick={createNewRecord}>Create Mineral</button>
            </div>
          </div>
        </div>
      </div>
      {/* Display existing mineral records */}
      <div>
        <div className="inputSectioncreate">
          <h2>Existing Minerals</h2>
          <div>
            {mineralRecords.map((record) => (
              <div key={record.key}>
                {/* Display mineral details and image */}
                {editMode && editRecordKey === record.key ? (
                  <div className=" stockitem">
                    <div className="parentGrid ">
                      <div>
                        <label>
                          Mineral Name : <br />
                          <input
                            type="text"
                            name="mineralName"
                            value={editedMineralData.mineralName}
                            onChange={(e) =>
                              setEditedMineralData((prevData) => ({
                                ...prevData,
                                mineralName: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Mineral Weight : <br />
                          <input
                            type="text"
                            name="mineralWeight"
                            value={editedMineralData.mineralWeight}
                            onChange={(e) =>
                              setEditedMineralData((prevData) => ({
                                ...prevData,
                                mineralWeight: e.target.value,
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
                            name="mineralInStock"
                            value={editedMineralData.mineralInStock}
                            onChange={(e) =>
                              setEditedMineralData((prevData) => ({
                                ...prevData,
                                mineralInStock: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Mineral Price : <br />
                          <input
                            type="number"
                            name="mineralPrice"
                            value={editedMineralData.mineralPrice}
                            onChange={(e) =>
                              setEditedMineralData((prevData) => ({
                                ...prevData,
                                mineralPrice: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Mineral Description : <br />
                          <input
                            type="text"
                            name="mineralDescrition"
                            value={editedMineralData.mineralDescrition}
                            onChange={(e) =>
                              setEditedMineralData((prevData) => ({
                                ...prevData,
                                mineralDescrition: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Mineral Image:
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Mineral Image:
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChangesub}
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Mineral Image:
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChangesub2}
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Mineral Image:
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
                        Mineral Name : <br />
                        {record.data.mineralName}
                      </div>
                      <div>
                        Mineral Weight : <br /> {record.data.mineralWeight}
                      </div>
                      <div>
                        Mineral InStock : <br /> {record.data.mineralInStock}
                      </div>
                      <div>
                        Mineral Price : <br /> {record.data.mineralPrice}
                      </div>
                      <div>
                        Mineral Descrition : <br />{" "}
                        {record.data.mineralDescrition}
                      </div>

                      <div>
                        {record.data.mineralImageURL && (
                          <img
                            src={record.data.mineralImageURL}
                            alt={`Mineral: ${record.data.mineralName}`}
                          />
                        )}
                      </div>

                      <div>
                        {record.data.mineralImagesubURL && (
                          <img
                            src={record.data.mineralImagesubURL}
                            alt={`Mineral: ${record.data.mineralName}`}
                          />
                        )}
                      </div>
                      <div>
                        {record.data.mineralImagesubURLT && (
                          <img
                            src={record.data.mineralImagesubURLT}
                            alt={`Mineral: ${record.data.mineralName}`}
                          />
                        )}
                      </div>
                      <div>
                        {record.data.mineralImagesubURLTH && (
                          <img
                            src={record.data.mineralImagesubURLTH}
                            alt={`Mineral: ${record.data.mineralName}`}
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

export default MineralsDashboard;
