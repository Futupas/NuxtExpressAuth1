export default function (req, res, next) {
    // Use req, res, next
    // res.write('hello world');
    console.log(req.url);
    next();
}
