const fs = require("fs");


async function play(req, res){
    try {
        let video_path = "uploads/video1.mp4";
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
        return res.status(400).send({ type: 'error', msg: "error"});
    }
}

async function play_url(req, res){
    
}

module.exports = { play, play_url };