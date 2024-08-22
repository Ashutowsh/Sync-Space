import { db } from "../name";
import createDocumentCollection from "./document.collection";
import createDocumentOutputCollection from "./document_output.collection";
import createWorkspaceCollection from "./workspace.collection";
import { databases } from "./config";

export default async function getOrCreateDB(){
  try {
    await databases.get(db)
    console.log("Database connection")
  } catch (error) {
    try {
      await databases.create(db, db)
      console.log("database created")
      //create collections
      await Promise.all([
        createWorkspaceCollection(),
        createDocumentOutputCollection(),
        createDocumentCollection(),

      ])
      console.log("Collection created")
      console.log("Database connected")
    } catch (error) {
      console.log("Error creating databases or collection", error)
    }
  }

  return databases
}