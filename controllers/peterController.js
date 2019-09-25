// async function currentEvents(req, res) {
//     try {
//       const db = req.app.get("db");
//       const event = await db.user_event.find({ user_id: req.session.user.id });
//       const events = event.map(item => ({
//         id: item.event_id,
//         title: item.title,
//         start: new Date(item.starttime),
//         end: new Date(item.endtime),
//         userId: item.user_id,
//         description: item.event_description
//       }));
//       if (!events.length)
//         return res
//           .status(204)
//           .send([]);
//       return res.send(events);
//     } catch (error) {
//       console.log(error);
//       res.status(500).send([]);
//     }
//   }