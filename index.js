const App = require("./server/server.js")
const path = require("path")

const port = process.env.PORT || 3610;

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.resolve(process.cwd(), './client/build')))
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), './client/build/index.html'))
    });
}

App.listen(port,(err)=>{
	if(err){
		console.log('na as pu se co')
	}else{
		console.log('Vous etes co sur ...'+port)
	}
})