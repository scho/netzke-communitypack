{
  initComponent: function(){
    console.log("initComponent");
    this.callParent();
    console.log("initComponent done");
  },
  buildReader: function() {
    console.log('buildReader');
    return Ext.create('Ext.data.reader.Json', {root: 'data', totalProperty: 'total'});
  },
  buildStore: function() {
    console.log('buildStore');
    var store = Ext.create('Ext.netzke.PagingTreeStore', Ext.apply({
      model: this.id,
      root: {data: []},
      proxy: this.buildProxy(),
      pruneModifiedRecords: true,
      remoteSort: true,
      pageSize: this.rowsPerPage,
      autoLoad: !this.loadInlineData
    }, this.dataStore));

    delete this.dataStore;

    return store;
  },
  processColumns: function() {
    console.log("processColumns");
    this.callParent();

    // Run through columns and set up different configuration for each
    Ext.each(this.columns, function(c, i){
      if(i == 0){
        console.log('set treeColumn');
        c.xtype = 'treeColumn';
      }
    });

    console.log("processColumns done");
  }
}
