const router = require('express').Router()
const roomMatchMaker = require('../controllers/RoomMatchmaker')
const roomController = require('../controllers/RoomController')

function getRoomController(properties){
    var q_manager = new roomMatchMaker.QueueingManager(properties);
    var mm_manager = new roomMatchMaker.MatchPairingManager(properties);
    var ds_manager = new roomMatchMaker.DataStoreManager(properties, q_manager, mm_manager);
    return ds_manager;
}

function roomRouter(dsManager){
    router.post('/new', (req, res) => roomController.new_peer_request(req, res, dsManager));
    router.post('/status', (req, res) => roomController.match_status_query(req, res, dsManager));
    router.post('/drop', (req, res) => roomController.drop_request_query(req, res, dsManager));
    
    return router;
}


module.exports = {
    getRoomController, RoomRouter: roomRouter
}