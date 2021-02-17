<map version="freeplane 1.8.0">
<!--To view this file, download free mind mapping software Freeplane from http://freeplane.sourceforge.net -->
<node TEXT="System" FOLDED="false" ID="ID_1890886602" CREATED="1613287712585" MODIFIED="1613322189899" STYLE="oval">
<font SIZE="18"/>
<hook NAME="MapStyle">
    <properties edgeColorConfiguration="#808080ff,#ff0000ff,#0000ffff,#00ff00ff,#ff00ffff,#00ffffff,#7c0000ff,#00007cff,#007c00ff,#7c007cff,#007c7cff,#7c7c00ff" fit_to_viewport="false"/>

<map_styles>
<stylenode LOCALIZED_TEXT="styles.root_node" STYLE="oval" UNIFORM_SHAPE="true" VGAP_QUANTITY="24.0 pt">
<font SIZE="24"/>
<stylenode LOCALIZED_TEXT="styles.predefined" POSITION="right" STYLE="bubble">
<stylenode LOCALIZED_TEXT="default" ICON_SIZE="12.0 pt" COLOR="#000000" STYLE="fork">
<font NAME="SansSerif" SIZE="10" BOLD="false" ITALIC="false"/>
</stylenode>
<stylenode LOCALIZED_TEXT="defaultstyle.details"/>
<stylenode LOCALIZED_TEXT="defaultstyle.attributes">
<font SIZE="9"/>
</stylenode>
<stylenode LOCALIZED_TEXT="defaultstyle.note" COLOR="#000000" BACKGROUND_COLOR="#ffffff" TEXT_ALIGN="LEFT"/>
<stylenode LOCALIZED_TEXT="defaultstyle.floating">
<edge STYLE="hide_edge"/>
<cloud COLOR="#f0f0f0" SHAPE="ROUND_RECT"/>
</stylenode>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.user-defined" POSITION="right" STYLE="bubble">
<stylenode LOCALIZED_TEXT="styles.topic" COLOR="#18898b" STYLE="fork">
<font NAME="Liberation Sans" SIZE="10" BOLD="true"/>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.subtopic" COLOR="#cc3300" STYLE="fork">
<font NAME="Liberation Sans" SIZE="10" BOLD="true"/>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.subsubtopic" COLOR="#669900">
<font NAME="Liberation Sans" SIZE="10" BOLD="true"/>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.important">
<icon BUILTIN="yes"/>
</stylenode>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.AutomaticLayout" POSITION="right" STYLE="bubble">
<stylenode LOCALIZED_TEXT="AutomaticLayout.level.root" COLOR="#000000" STYLE="oval" SHAPE_HORIZONTAL_MARGIN="10.0 pt" SHAPE_VERTICAL_MARGIN="10.0 pt">
<font SIZE="18"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,1" COLOR="#0033ff">
<font SIZE="16"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,2" COLOR="#00b439">
<font SIZE="14"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,3" COLOR="#990000">
<font SIZE="12"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,4" COLOR="#111111">
<font SIZE="10"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,5"/>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,6"/>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,7"/>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,8"/>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,9"/>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,10"/>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,11"/>
</stylenode>
</stylenode>
</map_styles>
</hook>
<hook NAME="AutomaticEdgeColor" COUNTER="12" RULE="ON_BRANCH_CREATION"/>
<node TEXT="Server" POSITION="right" ID="ID_81864773" CREATED="1613287741782" MODIFIED="1613287744448">
<edge COLOR="#ff0000"/>
<node TEXT="Users" ID="ID_334843515" CREATED="1613287779870" MODIFIED="1613287788648">
<node TEXT="NewUserForm" ID="ID_1636108733" CREATED="1613287789158" MODIFIED="1613287797120"/>
</node>
<node TEXT="Articles" ID="ID_137730261" CREATED="1613287964685" MODIFIED="1613287966127"/>
<node TEXT="UserArticles" ID="ID_1184036885" CREATED="1613287966525" MODIFIED="1613287972224"/>
</node>
<node TEXT="Client" POSITION="right" ID="ID_1778658210" CREATED="1613287744822" MODIFIED="1613320145360" HGAP_QUANTITY="20.74999979883433 pt" VSHIFT_QUANTITY="-343.4999897629026 pt">
<edge COLOR="#0000ff"/>
<node TEXT="NewUserForm: DataRoot: Users.New" ID="ID_281309939" CREATED="1613287757006" MODIFIED="1613287939783">
<node TEXT="UserName" ID="ID_1697145717" CREATED="1613287765822" MODIFIED="1613287773344"/>
<node TEXT="UserEmail" ID="ID_1130765562" CREATED="1613287774102" MODIFIED="1613287775959"/>
<node TEXT="UserPhone" ID="ID_1308564432" CREATED="1613287776085" MODIFIED="1613287778192"/>
<node TEXT="Submit:EmplaceUser" ID="ID_1928160722" CREATED="1613288145309" MODIFIED="1613288173240"/>
<node TEXT="Receipient: UserActor.User" ID="ID_77500087" CREATED="1613288079037" MODIFIED="1613288087735"/>
</node>
<node TEXT="UserActor" ID="ID_1288567472" CREATED="1613287900862" MODIFIED="1613288093631">
<node TEXT="NewArticleForm: Articles.New" ID="ID_333321356" CREATED="1613287993790" MODIFIED="1613288024752"/>
<node TEXT="User" ID="ID_414673316" CREATED="1613288094389" MODIFIED="1613288096135"/>
</node>
</node>
<node TEXT="Synchronization" POSITION="right" ID="ID_738278831" CREATED="1613320140104" MODIFIED="1613321803275" HGAP_QUANTITY="15.499999955296513 pt" VSHIFT_QUANTITY="-3.749999888241298 pt">
<edge COLOR="#007c7c"/>
</node>
<node TEXT="Flow Context" POSITION="right" ID="ID_114013477" CREATED="1613321782956" MODIFIED="1613322189899" HGAP_QUANTITY="18.499999865889553 pt">
<edge COLOR="#7c7c00"/>
<node TEXT="Remote Invoke of Command" ID="ID_1463218261" CREATED="1613322228493" MODIFIED="1613322249864">
<node TEXT="Standing Position Schema" ID="ID_1583306453" CREATED="1613322252782" MODIFIED="1613322285450">
<node TEXT="Client, User, ..." ID="ID_1977543933" CREATED="1613322297768" MODIFIED="1613322318155"/>
</node>
<node TEXT="Standing Position Arguments" ID="ID_776648597" CREATED="1613322286176" MODIFIED="1613322291162">
<node TEXT="Client ID=aaa, User ID=bbb, ..." ID="ID_617917460" CREATED="1613322320728" MODIFIED="1613322350853"/>
</node>
<node TEXT="Verb" ID="ID_957029395" CREATED="1613322353106" MODIFIED="1613322363645">
<node TEXT="NewItem" ID="ID_1956126834" CREATED="1613322364426" MODIFIED="1613322408974"/>
</node>
<node TEXT="Verb Target" ID="ID_1920316862" CREATED="1613322372419" MODIFIED="1613322374413">
<node TEXT="Emplace" ID="ID_52010660" CREATED="1613322377707" MODIFIED="1613322414270"/>
</node>
<node TEXT="CmdSpec" ID="ID_257940695" CREATED="1613322416587" MODIFIED="1613322424166">
<node TEXT="Return to Scope ID" ID="ID_1848219244" CREATED="1613322427396" MODIFIED="1613322445455">
<node TEXT="Javascript: could be Implicit" ID="ID_1626724966" CREATED="1613322513431" MODIFIED="1613322521408"/>
</node>
<node TEXT="What to do when returned" ID="ID_1886787221" CREATED="1613322446061" MODIFIED="1613322485416"/>
</node>
</node>
</node>
<node TEXT="Versioning/Transactioning" POSITION="right" ID="ID_272166377" CREATED="1613321787068" MODIFIED="1613321799451">
<edge COLOR="#ff0000"/>
</node>
</node>
</map>
