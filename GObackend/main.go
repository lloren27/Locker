package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// esto es el modelo del para la base de datos o loos datos para su uso , el string es como se vera el objeto.

func main() {
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/sneakers", getAllSneakers).Methods("GET")
	myRouter.HandleFunc("/sneaker", createNewSneaker).Methods("POST")
	myRouter.HandleFunc("/sneaker/{id}", returnSingleSneaker).Methods("GET")
	myRouter.HandleFunc("/updateSneaker/{id}", updateSneaker).Methods("PUT")
	myRouter.HandleFunc("/deleteSneaker/{id}", deleteSneaker).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8082", myRouter))
}
