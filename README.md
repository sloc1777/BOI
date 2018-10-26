![image](https://i.imgur.com/oH1sSSg.png)

# Blockchain Object Identifier System (BOI)
Introducing the Blockchain Object Identifier System (BOI) and DOI-system based on the NEM blockchain. The system differentiates it from the DOI system because it is fully decentralized, which means no centralized entities is controlling who can create and update BOI's. Moreover, the NEM BOI system only cost a fraction of the price of using the original DOI-system. The original DOI-system can cost up to 1 $ usd for each DOI registration plus and annual fee. Using the BOI-system will only cost a few cents per registration and no annual fee.

![image](https://i.imgur.com/5J86nl7.png)

# What is a Digital Object Identifier System (DOI)
In computing, a Digital Object Identifier or DOI is a persistent identifier or handle used to uniquely identify objects, standardized by the International Organization for Standardization (ISO). An implementation of the Handle System, DOIs are in wide use mainly to identify academic, professional, and government information, such as journal articles, research reports and data sets, and official publications though they also have been used to identify other types of information resources, such as commercial videos. Over 175 million DOI have been issued.

A DOI aims to be "resolvable", usually to some form of access to the information object to which the DOI refers. This is achieved by binding the DOI to metadata about the object, such as a URL, indicating where the object can be found. Thus, by being actionable and interoperable, a DOI differs from identifiers such as ISBNs and ISRCs which aim only to uniquely identify their referents.

The DOI for a document remains fixed over the lifetime of the document, whereas its location and other metadata may change. Referring to an online document by its DOI is supposed to provide a more stable link than simply using its URL. But every time a URL changes, the publisher has to update the metadata for the DOI to link to the new URL.


# API
You can use the BOI api for direct linking, retrieving metadata as json or information about BOI ownership. 

##### Linking to object
?boi=Proce./1540543147317

Will redirect the user to the url linked to the BOI object.

##### Get BOI metadata 
?json=yes&boi=Proce./1540543147317

Example of returned JSON object: 
```json
{"BOI":"yes", "url":"https://ieeexplore.ieee.org/document/771073","title":"Toward unique identifiers","authors":"N. Paskin et al.","publisher":"Proceedings of the IEEE","year":"1999","vol":"87","issue":"7","pages":"1208 - 1227" }
``` 
##### Get BOI owner 
?owner=yes&boi=Proce./1540543147317

Example of returned JSON object: 
```json
{"owner":"NBJ4HJSBDZA4CKH2N4EMV2RURTTNX34HDULNSLNE"}
``` 
