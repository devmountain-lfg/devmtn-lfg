module.exports = {
getEventById : async (req, res) => {
    try {
      const event_id = req.query.event_id;
      const db = req.app.get("db");
      const query = `SELECT * FROM events WHERE event_id = ${event_id}`
      const results = await db.query(query);
        res.status(200).send(results);
      } catch (err) { 
        res.status(500).send(err);
        console.log(`here is error: ${err}`);
      }
  },
}