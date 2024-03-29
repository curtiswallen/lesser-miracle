const contentful = require('contentful')
const richText = require('@contentful/rich-text-html-renderer')
const https = require('http')
const fs = require('fs')
const path = require('path')

const client = contentful.createClient({
  space: 'iwfncpxvalg0',
  accessToken: '3q_kDFBspl5JXPEzd4AJ9BnEBNzHaWUiRXUKMVl-7Jo'
})

client.getEntries({
  limit: 1000,
  'content_type': 'collections'
})
.then(function (entries) {

	console.log("############## Processing Collection Content ###############");

  entries.items.forEach(function (entry) {
    let dir = 'content/collections/'

    if (!fs.existsSync(dir)){
				fs.mkdirSync(dir, { recursive: true });
		}

		let collection = {}
		collection.title = entry.fields.title;
		collection.description = entry.fields.description;
		collection.floaterImages = entry.fields.floaterImages;
		collection.slug = entry.fields.slug;
		
		let JSONcollection = JSON.stringify(collection);
        fs.writeFile(dir+entry.fields.slug+'.md', JSONcollection, (err) => {
			if (err) {
    			throw err;
			}
				console.log(entry.fields.title+" collection data is saved.");
		});
  })
})
.catch(console.error);

client.getEntries({
  limit: 1000,
  'content_type': 'projects'
})
.then(function (entries) {

	console.log("############## Processing Project Content ###############");

  entries.items.forEach(function (entry) {
    let dir = 'content/projects/'

    if (!fs.existsSync(dir)){
			fs.mkdirSync(dir, { recursive: true });
		}

		let project = {}
		project.title = entry.fields.title;
		project.description = entry.fields.description;
		project.externalLink = entry.fields.externalLink;
		project.externalLinkDirect = entry.fields.externalLinkDirect;
		project.slug = entry.fields.slug;
		
		let JSONproject = JSON.stringify(project);
        fs.writeFile(dir+entry.fields.slug+'.md', JSONproject, (err) => {
			if (err) {
    			throw err;
			}
				console.log(entry.fields.title+" project data is saved.");
		});
  })
})
.catch(console.error);

client.getEntries({
  limit: 1000,
  'content_type': 'press'
})
.then(function (entries) {

	console.log("############## Processing Press Content ###############");

  entries.items.forEach(function (entry) {
    let dir = 'content/press/'

    fs.readdir(dir, (err, files) => {
  		if (err) throw err;

  		for (const file of files) {
    		fs.unlink(path.join(dir, file), err => {
      		if (err) throw err;
    		});
  		}
		})

		let press = {}
		press.title = entry.fields.title;
		press.externalLink = entry.fields.externalLink;
		press.slug = entry.fields.slug;
		
		let JSONpress = JSON.stringify(press);
        fs.writeFile(dir+entry.fields.slug+'-'+Math.random()+'.md', JSONpress, (err) => {
			if (err) {
    			throw err;
			}
				console.log(entry.fields.title+" press data is saved.");
		});
  })
})
.catch(console.error);

client.getEntries({
  limit: 1000,
  'content_type': 'pieces'
})
.then(function (entries) {

	console.log("############## Processing Pieces Content ###############");

  entries.items.forEach(function (entry) {
    let dir = 'content/pieces/'

    if (!fs.existsSync(dir)){
			fs.mkdirSync(dir, { recursive: true });
		}

		let piece = {}
		piece.title = entry.fields.title;
		piece.description = entry.fields.description;
		piece.images = entry.fields.images;
		piece.collectionproject = entry.fields.collectionproject;
		piece.slug = entry.fields.slug;
		
		let JSONpiece = JSON.stringify(piece);
        fs.writeFile(dir+entry.fields.slug+'.md', JSONpiece, (err) => {
			if (err) {
    			throw err;
			}
				console.log(entry.fields.title+" piece data is saved.");
		});
  })
})
.catch(console.error);

client.getEntries({
  'content_type': 'about'
})
.then(function (entries) {

	console.log("############## Processing About Content ###############");

  entries.items.forEach(function (entry) {
    let dir = 'content/about/'

    if (!fs.existsSync(dir)){
			fs.mkdirSync(dir, { recursive: true });
		}

		let about = {}
		about.title = entry.fields.aboutTitle;
		about.description = entry.fields.about;
		
		let JSONabout = JSON.stringify(about);
        fs.writeFile(dir+entry.fields.aboutTitle+'.md', JSONabout, (err) => {
			if (err) {
    			throw err;
			}
				console.log("About data is saved.");
		});
  })
})
.catch(console.error);

client.getEntries({
  'content_type': 'contact'
})
.then(function (entries) {

	console.log("############## Processing Contact Content ###############");

  entries.items.forEach(function (entry) {
    let dir = 'content/contact/'

    if (!fs.existsSync(dir)){
			fs.mkdirSync(dir, { recursive: true });
		}

		let contact = {}
		contact.title = entry.fields.contactTitle;
		contact.description = entry.fields.contact;
		
		let JSONcontact = JSON.stringify(contact);
        fs.writeFile(dir+entry.fields.contactTitle+'.md', JSONcontact, (err) => {
			if (err) {
    			throw err;
			}
				console.log("Contact data is saved.");
		});
  })
})
.catch(console.error);

