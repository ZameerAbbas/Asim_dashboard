import { useEffect, useState } from "react";
import "../css/gems.css";
import Logout from "./Logout";
import { db } from "../components/firebase";
import { onValue, push, ref, remove, update } from "firebase/database";

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [newGemData, setNewGemData] = useState({
    gemName: "",
    gemWeight: "",
    gemInstock: "",
    gemPrice: "",
    gemDescription: "",
    gemImage: null,
    gemImageURL: "",
    gemImagesub: null,
    gemImageURLsub: "",
    gemImagesubt: null,
    gemImageURLT: "",
    gemImagesubth: null,
    gemImageURLTh: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editRecordKey, setEditRecordKey] = useState("");
  const [editedGemData, setEditedGemData] = useState({
    gemName: "",
    gemWeight: "",
    gemInstock: "",
    gemPrice: "",
    gemDescription: "",
    gemImage: null,
    gemImageURL: "",
    gemImagesub: null,
    gemImageURLsub: "",
    gemImagesubt: null,
    gemImageURLT: "",
    gemImagesubth: null,
    gemImageURLTh: "",
  });

  useEffect(() => {
    const dbRef = ref(db, "gems");
    onValue(dbRef, (snapshot) => {
      let records = [];

      snapshot.forEach((childSnapshot) => {
        let keyname = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyname, data: data });
      });
      setRecords(records);
    });
  }, []);

  const createNewRecord = () => {
    const gemOneRef = ref(db, "gems");
    push(gemOneRef, {
      ...newGemData,
      gemPrice: parseFloat(newGemData.gemPrice),
    })
      .then(() => {
        alert("New node created successfully!");
        setNewGemData({
          gemName: "",
          gemWeight: "",
          gemInstock: "",
          gemPrice: "",
          gemDescription: "",
          gemImage: null,
          gemImageURL: "",
          gemImagesub: null,
          gemImageURLsub: "",
          gemImagesubt: null,
          gemImageURLT: "",
          gemImagesubth: null,
          gemImageURLTh: "",
        });
      })
      .catch((error) => {
        alert("Error creating node: ", error);
      });
  };

  // const createNewRecord = () => {

  //   const gemOneRef = ref(db, "gems");
  //   push(gemOneRef, {
  //     ...newGemData,
  //     gemPrice: parseFloat(newGemData.gemPrice), // Convert to number
  //   })
  //     .then(() => {
  //       alert("New node created successfully!");
  //       setNewGemData({
  //         gemName: "",
  //         gemWeight: "",
  //         gemInstock: "",
  //         gemPrice: "", // Reset to an empty string
  //         gemDescription: "",
  //         gemImage: null,
  //         gemImageURL: "",
  //         gemImagesub: null,
  //         gemImageURLsub: "",
  //         gemImagesubt: null,
  //         gemImageURLT: "",
  //         gemImagesubth: null,
  //         gemImageURLTh: "",
  //       });
  //     })
  //     .catch((error) => {
  //       alert("Error creating node: " + error.message); // Concatenate the error message
  //     });
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewGemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewGemData((prevData) => ({
          ...prevData,
          gemImage: imageFile,
          gemImageURL: reader.result,
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
        setNewGemData((prevData) => ({
          ...prevData,
          gemImagesub: imageFile,
          gemImageURLsub: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleImageChangesubt = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewGemData((prevData) => ({
          ...prevData,
          gemImagesubt: imageFile,
          gemImageURLT: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleImageChangesubth = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewGemData((prevData) => ({
          ...prevData,
          gemImagesubth: imageFile,
          gemImageURLTh: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const startEditing = (key, data) => {
    setEditMode(true);
    setEditRecordKey(key);
    setEditedGemData({
      ...data,
      gemImageURL: data.gemImageURL,
      gemImageURLsub: data.gemImageURLsub,
      gemImageURLT: data.gemImageURLT,
      gemImageURLTh: data.gemImageURLTh,
    });
  };

  const cancelEditing = () => {
    setEditMode(false);
    setEditRecordKey("");
    setEditedGemData({
      gemName: "",
      gemWeight: "",
      gemInstock: "",
      gemPrice: "",
      gemDescription: "",
      gemImage: null,
      gemImageURL: "",
      gemImagesub: null,
      gemImageURLsub: "",
      gemImagesubt: null,
      gemImageURLT: "",
      gemImagesubth: null,
      gemImageURLTh: "",
    });
  };

  const saveEditedRecord = () => {
    const gemOneRef = ref(db, `gems/${editRecordKey}`);

    const updatedGemData = {
      gemName: editedGemData.gemName,
      gemWeight: editedGemData.gemWeight,
      gemInstock: editedGemData.gemInstock,
      gemPrice: editedGemData.gemPrice,
      gemDescription: editedGemData.gemDescription,
      gemImageURL: editedGemData.gemImageURL, // Update image URLs here
      gemImageURLsub: editedGemData.gemImageURLsub,
      gemImageURLT: editedGemData.gemImageURLT,
      gemImageURLTh: editedGemData.gemImageURLTh,
    };

    // Update the database record
    update(gemOneRef, updatedGemData)
      .then(() => {
        console.log("Node updated successfully!");
        setEditMode(false);
        setEditRecordKey("");
        setEditedGemData({
          gemName: "",
          gemWeight: "",
          gemInstock: "",
          gemPrice: "",
          gemDescription: "",
          gemImage: null,
          gemImageURL: "",
          gemImagesub: null,
          gemImageURLsub: "",
          gemImagesubt: null,
          gemImageURLT: "",
          gemImagesubth: null,
          gemImageURLTh: "",
        });
      })
      .catch((error) => {
        console.error("Error updating node: ", error);
      });
  };

  const deleteRecord = (key) => {
    const gemOneRef = ref(db, `gems/${key}`);
    remove(gemOneRef)
      .then(() => {
        alert("Node deleted successfully!");
      })
      .catch((error) => {
        alert("Error creating node: " + error.message);
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
        <h1>Create New Gems</h1>
        <div>
          <div className="lablesFLex">
            <label>
              GemName : <br />
              <input
                type="text"
                name="gemName"
                placeholder="Gem Name"
                value={newGemData.gemName}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              GemWeight : <br />
              <input
                type="text"
                name="gemWeight"
                placeholder="Gem Weight"
                value={newGemData.gemWeight}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="lablesFLex">
            <label>
              Instock : <br />
              <input
                type="text"
                name="gemInstock"
                placeholder="Gem Instock"
                value={newGemData.gemInstock}
                onChange={handleInputChange}
              />
            </label>

            <label>
              GemPrice : <br />
              <input
                type="number"
                name="gemPrice"
                placeholder="Gem Price"
                value={newGemData.gemPrice}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Gem Description : <br />
              <input
                type="text"
                name="gemDescription"
                placeholder="Gem Description"
                value={newGemData.gemDescription}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="imageinputcreate">
            <div className="lablesFLex">
              <label>
                GemImage: <br />
                <input
                  type="file"
                  name="gemImage"
                  onChange={handleImageChange}
                />
              </label>

              <label>
                Gem Sub Image <br />
                <input
                  type="file"
                  name="gemImage"
                  onChange={handleImageChangesub}
                />
              </label>
            </div>
            <div className="lablesFLex">
              <label>
                Gem Sub Image : <br />
                <input
                  type="file"
                  name="gemImage"
                  onChange={handleImageChangesubt}
                />
              </label>

              <label>
                Gem Sub Image <br />
                <input
                  type="file"
                  name="gemImage"
                  onChange={handleImageChangesubth}
                />
              </label>
            </div>
          </div>
        </div>
        <div>
          {editMode ? (
            <>
              <button onClick={saveEditedRecord}>Save</button>
              <button onClick={cancelEditing}>Cancel</button>
            </>
          ) : (
            <button onClick={createNewRecord}>Create New Node</button>
          )}
        </div>
      </div>
      <div className="inputSectioncreate">
        <h1> Existing Data </h1>
        <div>
          {records.map((record) => (
            <div key={record.key}>
              {editMode && editRecordKey === record.key ? (
                <div className=" stockitem">
                  <div className="parentGrid ">
                    <div>
                      <lable>
                        Gem Name :
                        <input
                          type="text"
                          name="gemName"
                          value={editedGemData.gemName}
                          onChange={(e) =>
                            setEditedGemData((prevData) => ({
                              ...prevData,
                              gemName: e.target.value,
                            }))
                          }
                        />
                      </lable>
                    </div>
                    <div>
                      <label>
                        Gem Weight :
                        <input
                          type="text"
                          name="gemWeight"
                          value={editedGemData.gemWeight}
                          onChange={(e) =>
                            setEditedGemData((prevData) => ({
                              ...prevData,
                              gemWeight: e.target.value,
                            }))
                          }
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        {" "}
                        In Stock
                        <input
                          type="text"
                          name="gemInstock"
                          value={editedGemData.gemInstock}
                          onChange={(e) =>
                            setEditedGemData((prevData) => ({
                              ...prevData,
                              gemInstock: e.target.value,
                            }))
                          }
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Gem Price
                        <input
                          type="text"
                          name="gemPrice"
                          value={editedGemData.gemPrice}
                          onChange={(e) =>
                            setEditedGemData((prevData) => ({
                              ...prevData,
                              gemPrice: e.target.value,
                            }))
                          }
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Gem Description
                        <input
                          type="text"
                          name="Gem Description"
                          value={editedGemData.gemDescription}
                          onChange={(e) =>
                            setEditedGemData((prevData) => ({
                              ...prevData,
                              gemDescription: e.target.value,
                            }))
                          }
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        GemImage
                        <input
                          type="file"
                          name="gemImage"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Gem Sub Image
                        <input
                          type="file"
                          name="gemImage"
                          onChange={handleImageChangesub}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Gem Sub Image
                        <input
                          type="file"
                          name="gemImage"
                          onChange={handleImageChangesubt}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Gem Sub Image
                        <input
                          type="file"
                          name="gemImage"
                          onChange={handleImageChangesubth}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="editBtn">
                    <button onClick={saveEditedRecord}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="stockitem">
                  <div className="parentGrid">
                    <div>
                      gemName: <br /> {record.data.gemName}
                    </div>
                    <div>
                      gemWeight: <br /> {record.data.gemWeight}
                    </div>
                    <div>
                      gemInstock: <br /> {record.data.gemInstock}
                    </div>
                    <div>
                      gemPrice: <br /> {record.data.gemPrice}
                    </div>
                    <div>
                      gemDescription : <br /> {record.data.gemDescription}
                    </div>
                    <div>
                      Main Image : <br />
                      {record.data.gemImageURL && (
                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                        <img
                          src={record.data.gemImageURL}
                          alt={"error to load image"}
                        />
                      )}
                    </div>
                    <div>
                      Gem Sub Image : <br />
                      {record.data.gemImageURLsub && (
                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                        <img
                          src={record.data.gemImageURLsub}
                          alt={"error to load image"}
                        />
                      )}
                    </div>
                    <div>
                      Gem Sub Image : <br />
                      {record.data.gemImageURLT && (
                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                        <img
                          src={record.data.gemImageURLT}
                          alt={"error to load image"}
                        />
                      )}
                    </div>
                    <div>
                      Gem Sub Image : <br />
                      {record.data.gemImageURLTh && (
                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                        <img
                          src={record.data.gemImageURLTh}
                          alt={"error to load image"}
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
  );
};

export default Dashboard;

// const saveEditedRecord = () => {
//   const gemOneRef = ref(db, `gems/${editRecordKey}`);
//   update(gemOneRef, editedGemData)
//     .then(() => {
//       console.log("Node updated successfully!");
//       setEditMode(false);
//       setEditRecordKey("");
//       setEditedGemData({
//         gemName: "",
//         gemWeight: "",
//         gemInstock: "",
//         gemPrice: "",
//         gemDescription: "",
//         gemImage: null,
//         gemImageURL: "",
//         gemImagesub: null,
//         gemImageURLsub: "",
//         gemImagesubt: null,
//         gemImageURLT: "",
//         gemImagesubth: null,
//         gemImageURLTh: "",
//       });
//     })
//     .catch((error) => {
//       console.error("Error updating node: ", error);
//     });
// };
