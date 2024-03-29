export default {
    template:`
<div>
<link rel="stylesheet" href="/assets/js/payment/common/yinsi.css" scope>
<div class="sBox" v-if="show">
    <h1>XXX党建平台用户隐私保护政策</h1>
    <div>更新日期：2019年10月12日</div>

    <div>为切实保护XXX党建平台用户隐私权，优化用户体验，XXX党建平台的运维方北京人民在线网络有限公司（以下简称“我们”）根据现行法律、法规及政策，制定本《用户隐私保护政策》（以下简称“本政策”）。本政策将详细说明XXX党建平台在获取、管理及保护用户个人信息方面的政策及措施。本政策适用于我们向您提供的XXX党建平台相关所有服务（以下简称“党建平台”），无论您是通过计算机设备、移动终端或其他设备获得的党建平台服务。</div>
    <div>本政策是您使用党建平台服务及各项功能的基础性法律文件，我们希望您在使用党建平台服务前仔细阅读并明确您已经充分理解、接受本政策的内容，其中的重点内容已用粗体加下划线的方式表示。一旦您使用党建平台产品/服务，即表示您同意按照本政策处理您的相关信息。我们可能会不时对本政策进行修订，在我们更新本政策后，会在党建平台以推送通知、弹窗等形式向您展示修订后的内容，若您继续使用党建平台产品与/或服务，即意味着您同意本政策（含更新版本）内容，并且同意我们按照本政策收集、使用、保存和共享您的相关信息。</div>
    <div>本政策涉及的个人信息包括：基本信息（包括个人姓名、生日、性别、从事职业、现任职单位名称、住址、个人电话号码、电子邮箱、身份证信息、银行卡信息）；个人位置信息；网络身份标识信息（包括系统账号、头像、IP地址、邮箱地址及与前述有关的密码、密保）；个人上网记录（包括搜索记录、使用记录、点击记录）；个人常用设备信息（包括硬件型号、设备MAC地址、操作系统类型）；其他信息个人身份要素。</div>


    <h2>一、个人信息的收集</h2>
    <div>您已知悉且同意，在您注册党建平台账号或使用党建平台服务时，党建平台将记录您提供的相关个人信息，如：密码、手机号码、姓名、身份证号码等，上述个人信息是您获得党建平台服务的基础。同时，基于优化用户体验之目的，党建平台会获取与提升党建平台服务有关的其他信息。
    在您使用党建平台前，我们会引导您阅读本政策，并在您接受本政策的基础上，获得您的相关个人信息。如果您不同意提供个人信息，您将无法使用党建平台的全部或部分功能和服务。</div>
    <div>党建平台仅会在出现下列情况时收集您的个人信息：</div>
    <div>在您注册或登录党建平台账号时，我们至少会收集您的账户昵称、性别、密码、密码保护选项、电子邮箱、手机号码等信息。如果您拒绝提供这些信息，将影响您使用党建平台或党建平台的相关功能。</div>
    <div>在您使用党建平台党员在线缴费相关功能时，包括但不限于您通过党建平台在第三方金融机构开通电子账户时，我们会收集您的姓名、身份证号、手机号、银行卡号等信息并推送给与我们合作的第三方金融机构，党建平台对您的这些隐私信息会加以最大程度的保护并通过签署协议的形式约束第三方金融机构采取必要措施保证您的隐私信息不被恶意泄露，如果您不提供这些信息，我们将无法提供相关服务。</div>
    <div>根据您所在单位、党组织的管理要求，我们会收集您的身份证信息（此类信息可能由您所在单位、党组织的相关管理人员统一录入或采用其他方式提供给我们），此外，您所在单位、党组织的相关管理人员可从党建平台导出包含您的姓名、手机号码、身份证号码等信息在内的个人信息，以便进行各项管理工作。</div>
    <div>当您向我们提起投诉、申诉或进行咨询时，为了方便与您联系或帮助您解决问题，我们可能需要您提供姓名、手机号码、电子邮件及其他联系方式等个人信息。如您拒绝提供上述信息，我们可能无法向您及时反馈投诉、申诉或咨询结果。</div>
    <div>根据相关法律法规的规定，在以下情形中，我们可以在不征得您的授权同意的情况下收集、使用一些必要的个人信息：</div>
    <div>1、与国家安全、国防安全直接相关的；</div>
    <div>2、与公共安全、重大公共利益直接相关的；</div>
    <div>3、与犯罪侦查、起诉、审判和判决执行等直接相关的；</div>
    <div>4、出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；</div>
    <div>5、所收集的个人信息是您自行向社会公众公开的；</div>
    <div>6、从合法公开披露的信息中收集到您的个人信息，如从合法的新闻报道、政府信息公开等渠道；</div>
    <div>7、根据您的要求签订和履行合同所必需的；</div>
    <div>8、用于维护党建平台产品和/或服务的安全稳定运行所必需的，例如发现、处置产品服务或故障；</div>
    <div>9、法律法规规定的其他情形。</div>
    <div>另，如在上述场景之外获得您的个人信息，将重新征得您的明示同意，并在获得您明示同意前向您充分说明应用场景与获取您相关信息的内容与范围。</div>

    <h2>二、Cookie及同类技术的使用</h2>
    <div>Cookie和同类技术是互联网中普遍使用的技术，当您使用党建平台及相关服务时，我们可能会收集、存储您访问、使用党建平台产品/服务的信息。Cookie可以帮助网站辨认注册用户，计算用户数量，通常被各网站用来判定完成注册的用户是否已经实现登录。我们承诺，对cookie信息的研究仅用于提升服务/产品质量及优化用户体验之目的。同时，如不希望个人信息保留在cookie中，您可以进行配置：选择"拒绝cookie"或"当网站发送cookie时通知您"，您知道，鉴于党建平台的服务是通过支持cookie来是实现的，完成关闭cookie的操作后，可能影响到您访问党建平台或不能充分取得党建平台的服务。您不禁用cookie时，可能会得到提示，是否在下一次进入此网站时保留用户信息以便简化登录手续（如一键登录）。</div>
    <div>党建平台使用同类技术的方法和目的与cookie是相同的。</div>

    <h2>三、个人信息的保护和安全措施</h2>
    <div>1、我们将尽一切合理努力保护所获得的用户个人信息，并由专门的数据安全部门对个人信息进行保护。为防止用户个人信息在意外的、未经授权的情况下被非法访问、复制、修改、传送、遗失、破坏、处理或使用，我们已经并将继续采取以下措施保护您的个人信息：</div>
    <div>1）通过采取加密技术对用户个人信息进行加密保存，并通过隔离技术进行隔离。</div>
    <div>2）在个人信息使用时，例如个人信息展示、个人信息关联计算，我们会采用包括内容替换、加密脱敏等多种数据脱敏技术增强个人信息在使用中安全性。</div>
    <div>3）设立严格的数据使用和访问制度，采用严格的数据访问权限控制和多重身份认证技术保护个人信息，避免数据被违规使用。</div>
    <h2>2、保护个人信息采取的其他安全措施</h2>
    <div>1）通过建立数据分类分级制度、数据安全管理规范、数据安全开发规范来管理规范个人信息的存储和使用。</div>
    <div>2）建立数据安全专项部门，安排专门的人员负责安全应急响应组织来推进和保障个人信息安全。</div>
      <h2>3、个人信息安全事件的通知</h2>
    <div>1）如发生个人信息引发的安全事件，我们将第一时间向相应主管机关报备，并即时进行问题排查，开展应急措施。</div>
    <div>2）通过党建平台向用户发送通知提醒更改密码。还可能通过电话、短信等各种方式通知用户知晓，在党建平台的显著位置对用户进行提醒。</div>
    <div>尽管已经采取了上述合理有效措施，并已经遵守了相关法律规定要求的标准，但我们仍然无法保证您的个人信息通过不安全途径进行交流时的安全性。因此，用户个人应采取积极措施保证个人信息的安全，如：定期修改账号密码，不将自己的账号密码等个人信息透露给他人。</div>
    <div>您知悉：我们提供的个人信息保护措施仅适用于党建平台，一旦您离开党建平台，浏览或使用其他网站、服务及内容资源，我们即没有能力及义务保护您在党建平台以外的网站提交的任何个人信息，无论您登录或浏览上述网站是否基于党建平台的链接或引导。</div>
    <div>网络环境中始终存在各种信息泄漏的风险，当出现意外事件、不可抗力等情形导致您的信息出现泄漏时，我们将极力控制局面，及时告知您事件起因、我们采取的安全措施、您可以主动采取的安全措施等相关情况。</div>

        <h2>四、个人信息的存储</h2>
    <div>我们会采取合适的安全措施和技术手段存储及保护您的个人信息，以防止丢失、被误用、受到未授权访问或泄漏、被篡改或毁坏。我们将依照法律法规的规定，将在境内运营过程中收集和产生的您的个人信息存储于中华人民共和国境内。目前，我们不会将上述信息传输至境外，如果我们向境外传输，我们将会严格遵循法律、法规及相关监管部门的规定并征得您的同意。我们仅在为提供党建平台产品及服务之目的所必需的期间内保留您的个人信息，超出必要期限后，我们将对您的个人信息进行删除或匿名化处理，但法律法规另有约定的除外。</div>
    <div>根据本条款的规定，我们仅允许有必要知晓这些信息的党建平台服务提供方的内部员工及依法授权的第三方访问个人信息，并要求他们履行相应的保密义务。</div>

    <h2>五、个人信息的使用和对外提供</h2>
    <div>未经您本人允许，我们不会向任何第三方公开（包括共享、转让、公开披露等方式）您的个人信息，下列情形除外：</div>
    <div>1、已经取得您或您监护人的授权或同意；</div>
    <div>2、按照法律法规规定或司法机关、行政机关基于法定程序要求党建平台披露的；</div>
    <div>3、党建平台为维护自身合法权益而向用户提起诉讼或仲裁时；</div>
    <div>4、根据您与我们签署的相关服务条款、应用许可使用协议的约定；</div>
    <div>5、在法律允许的范围内，为保障党建平台、党建平台用户以及社会公共利益免受损害时；</div>
    <div>6、您自行向社会公众公开的个人信息或从合法公开披露的信息中收集的个人信息，例如：合法的新闻报道、政府信息公开等渠道；</div>
    <div>7、在不透露单个用户隐私资料的前提下，党建平台有权对整个用户数据库进行分析并对用户数据库进行适当的使用；</div>
    <div>8、当您使用党建平台提供的党员在线缴费服务时，党建平台需将您的相关个人信息推送给其他第三方金融机构进而用于为您提供电子账户开户、线上缴费等服务，您在此同意并授权党建平台出于为您提供党员在线缴费服务的目的而将您的个人信息推送给第三方金融机构。</div>
    <div>9、您所在单位、党组织的相关管理人员出于统计所在单位、党组织的党员信息（包括但不限于所在单位、党组织党员党费缴纳情况统计）等管理目的，会通过党建平台收集您的相关个人信息，您在此同意并授权党建平台为前述人员提供您的个人信息（包含您的姓名、手机号码、身份证号码等）。</div>
    <div>为了向您提供更完善、优质的产品和服务，我们会与合作伙伴就产品、服务升级开展相关合作或将某些服务授权给合作伙伴提供，我们可能会与合作伙伴共享您的某些个人信息，以提供更好的客户服务和用户体验。我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享提供服务所必要的个人信息。同时，我们会与合作伙伴签署严格的保密协定，要求他们按照我们的说明、本政策以及其他任何相关的保密和安全措施来处理您的个人信息。我们的合作伙伴无权将共享的个人信息用于任何其他用途。 如果您拒绝我们的合作伙伴在提供服务时收集为提供服务所必须的个人信息，将可能导致您无法使用该第三方服务。</div>

        <h2>六、个人信息的管理</h2>
    <div>您有权自主更新或更正您的个人信息，或授权党建平台客服进行信息更新、更正。在您进行信息更新更正之前，我们会首先验证您的身份，其次才能进行信息的更正与更新。</div>
    <div>当您的账号由于您本人申请或其他合理、合法事由被注销后，党建平台将不再收集您的个人信息。在您的账号注销之前，党建平台将验证您的个人身份、安全状态、账户密码等信息。您注销账号的行为是不可逆的行为，一旦您注销您的账号，党建平台将即刻删除有关您账户的一切信息，并保证这些信息不会泄露，同时，您也无法通过已注销的账户获得党建平台的服务。</div>

        <h2>七、联系我们</h2>
    <div>如果您对个人信息保护问题有投诉、建议、疑问，您可以将问题发送至（），我们核查并验证您的用户身份后会及时反馈您的投诉与举报。</div>

        <h2>八、争议解决</h2>
    <div>当您因为本政策的实施与我们产生任何纠纷时，双方应首先协商友好解决；若不能协商解决，双方均有权向北京市朝阳区人民法院提起诉讼。</div>
    <div>如果您对本政策有任何疑问，请您联系党建平台客服咨询，我们会及时解决您的问题。</div>

  </div>
</div>
    `,
    data(){
        return {
            show:false
        }
    },
    created(){
        setTimeout(()=>{
            this.show= true;
        },500)
    }
}