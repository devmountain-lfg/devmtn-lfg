module.exports = {
getEventById : async (req, res) => {
    try {
      const event_id = req.query.eventId;
      const db = req.app.get("db");
      const query = `SELECT * FROM current_events_view WHERE event_id = ${event_id}`
      const results = await db.query(query);
        res.status(200).send(results);
      } catch (err) { 
        res.status(500).send(err);
        console.log(`here is error: ${err}`);
      }
  },
}