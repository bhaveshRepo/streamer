const fs = require("fs");
const { io } = require("../server");

async function play(req, res){
    try {

        io.on("connection", (socket) => {
            console.log(`connection socket: ${socket.id} is created`);
    
            socket.on('disconnect', () => {
                console.log(`Connection socket: ${socket.id} disconnected`);
            })
        })
    
        let id = req.params.id;
        let video_list = await fs.promises.readdir('uploads');
        let video_name = video_list.filter((value, index) => index == id ? value : null);
        if(!video_name || typeof video_name == "undefined" || video_name == ""){
            return res.status(200).send({ type: 'error', msg: "Video is currently unavailable"});
        }
        let video_path = `uploads/${video_name}`;
        let video_stat = fs.statSync(video_path);
        let fileSize = video_stat.size;
        let range = req.headers.range;
        console.log("Inside route");
        if(range){
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
            const chunkSize = (end-start) + 1;
            console.log({start, end, chunkSize});
            let stream = fs.createReadStream(video_path, {start, end});

            const header = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,

                'Accept-Ranges': 'bytes',

                'Content-Length': chunkSize,
                
                'Content-Type': 'video/mp4',
                
                };
    
            res.writeHead(206, header)                
            stream.pipe(res);
        } else {
            const header = {
                'Content-Length': fileSize,

                'Content-Type': 'video/mp4',
            };

            res.writeHead(200, header);
            fs.createReadStream(video_path).pipe(res);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({ type: 'error', msg: "error"});``
    }

}

async function video_list(req, res){
    let data = new Object();
    let result = await fs.promises.readdir("uploads");
    for(const item in result){
        data["id"] = item+1;
        data['name'] = result[item];
    }

    return res.status(200).send({ type: "success", msg: "data found", result: data});
}

module.exports = { play, video_list };