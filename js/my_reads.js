var MyReads = {
    config: {
        db: 'read_items',
        itemMap: {
            'A': ['A1', 'A2', 'B1'],
            'B': ['B1', 'B2', 'B3'],
            'C': ['C1', 'C2', 'B1']
        }
    },

    // URLパラメータを取得
    getUrlParameters: function() {
        var params = {};
        if (location.search) {
            var parts = location.search.substring(1).split('&');
            for (var i = 0; i < parts.length; i++) {
                var nv = parts[i].split('=');
                if (!nv[0]) continue;
                params[nv[0]] = nv[1];
            }
        }
        return params;
    },

    // アイテムマップを取得
    getItemMap: function() {
        return this.config.itemMap;
    },

    // 既読アイテム一覧を取得
    getAllItems: function() {
        return storedb(this.config.db).find();
    },

    // 既読アイテム追加
    addItem: function(itemKey, callback) {
        item = {
            itemKey: itemKey,
        };
        storedb(this.config.db).insert(item, function(err, result) {
            if(err){
                alert('アイテム追加失敗！');
                return;
            }
            if(callback) {
                callback(result);
            }
        });
    },

    // アイテム削除
    removeItem: function(itemKey, callback) {
        storedb(this.config.db).remove({'itemKey': itemKey}, function(err) {
            if(err){
                alert('アイテム削除失敗！');
                return;
            }
            if(callback) {
                callback(result);
            }
        });
    },

    // 全て削除（クリア）
    removeAll: function() {
        storedb(this.config.db).remove();
    },

    // 子アイテム既読状態の取得
    isItemRead: function(itemKey, pid) {
        return storedb(this.config.db).find({'itemKey': itemKey}).length > 0;
    },

    // 親アイテム既読状態の取得
    isTopItemRead: function(pid) {
        var topItems = MyReads.getItemMap();
        var itemList = topItems[pid];
        var readCount = 0;
        for(var i=0; i<itemList.length; i++) {
            if(this.isItemRead(itemList[i])) {
                readCount++;
            }
        }
        return itemList.length == readCount;
    }
};
