package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var sneakersCollection = db().Database("locker").Collection("sneakers")

type sneaker struct {
	Id           primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name         string             `json:"name"`
	Brand        string             `json:"brand"`
	Size         string             `json:"size"`
	DatePurchase time.Time          `json:"date_purchase"`
	Cover        string             `json:"cover"`
}

func createNewSneaker(w http.ResponseWriter, r *http.Request) {
	// get the body of our POST request
	// return the string response containing the request body
	w.Header().Set("Content-Type", "application/json") // for adding Content-type
	reqBody, _ := ioutil.ReadAll(r.Body)
	var sneaker sneaker
	json.Unmarshal(reqBody, &sneaker)
	// Actualizas tu array para meter el nuevo elemento
	insertResult, err := sneakersCollection.InsertOne(context.TODO(), sneaker)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(w, "Añadida la nueva zapatilla")
	json.NewEncoder(w).Encode(insertResult.InsertedID)

}

func getAllSneakers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var results []primitive.M                                       //slice for multiple documents
	cur, err := sneakersCollection.Find(context.TODO(), bson.D{{}}) //returns a *mongo.Cursor
	if err != nil {

		fmt.Println(err)

	}
	for cur.Next(context.TODO()) { //Next() gets the next document for corresponding cursor

		var elem primitive.M
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}

		results = append(results, elem) // appending document pointed by Next()
	}
	cur.Close(context.TODO()) // close the cursor once stream of documents has exhausted
	json.NewEncoder(w).Encode(results)
	fmt.Println("End Point Hit: todas las zapatillas")
}

func returnSingleSneaker(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)["id"]
	result := sneaker{}

	_id, err := primitive.ObjectIDFromHex(params) // convert params to mongodb Hex ID
	if err != nil {
		fmt.Printf(err.Error())
	}

	// call the collection's Find() method and return Cursor object into result
	err = sneakersCollection.FindOne(ctx, bson.M{"_id": _id}).Decode(&result)

	// Check for any errors returned by MongoDB FindOne() method call
	if err != nil {
		fmt.Println("FindOne() ObjectIDFromHex ERROR:", err)
		os.Exit(1)
	} else {
		// Print out data from the document result
		fmt.Println("result AFTER:", result, "\n")

		// Struct instances are objects with MongoDB fields that can be accessed as attributes
		json.NewEncoder(w).Encode(result)
	}

}

func deleteSneaker(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)["id"] //get Parameter value as string

	_id, err := primitive.ObjectIDFromHex(params) // convert params to mongodb Hex ID
	if err != nil {
		fmt.Printf(err.Error())
	}
	opts := options.Delete().SetCollation(&options.Collation{}) // to specify language-specific rules for string comparison, such as rules for lettercase
	res, err := sneakersCollection.DeleteOne(context.TODO(), bson.D{{"_id", _id}}, opts)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("deleted %v documents\n", res.DeletedCount)
	json.NewEncoder(w).Encode(res.DeletedCount) // return number of documents deleted

}

func updateSneaker(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)["id"]

	_id, err := primitive.ObjectIDFromHex(params) // convert params to mongodb Hex ID
	if err != nil {
		fmt.Printf(err.Error())
	}

	type updateBody struct {
		Name         string    `json:"name"`
		Brand        string    `json:"brand"`
		Size         string    `json:"size"`
		DatePurchase time.Time `json:"date_purchase"`
		Cover        string    `json:"cover"`
	}
	var body updateBody
	e := json.NewDecoder(r.Body).Decode(&body)
	if e != nil {

		fmt.Print(e)
	}
	filter := bson.D{{"_id", _id}} // converting value to BSON type
	after := options.After         // for returning updated document
	returnOpt := options.FindOneAndUpdateOptions{

		ReturnDocument: &after,
	}
	update := bson.M{
		"$set": bson.M{"name": body.Name, "brand": body.Brand, "size": body.Size, "date_purchase": body.DatePurchase, "cover": body.Cover},
	}
	updateResult := sneakersCollection.FindOneAndUpdate(context.TODO(), filter, update, &returnOpt)

	var result primitive.M
	_ = updateResult.Decode(&result)

	json.NewEncoder(w).Encode(result)
}
