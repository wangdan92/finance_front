<template>
  <el-card m="2">
    <el-descriptions m="2" border>
      <el-descriptions-item label="项目名称">{{ data.projectName }}</el-descriptions-item>
      <el-descriptions-item label="客户名称">{{ data.clientName }}</el-descriptions-item>
      <el-descriptions-item label="产能需求">{{ data.requiredCapacity }}</el-descriptions-item>
      <el-descriptions-item label="编制时间">{{ formatDateTime(data.compileDate) }}</el-descriptions-item>
    </el-descriptions>
    <el-button type="primary" class="m-2" @click="handleFethNreTableDownload" v-if="!hideBtn">NRE核价表下载</el-button>
    <el-card class="margin-top" header="手板件费用">
      <el-row justify="end" m="2">
        <el-button type="primary" @click="addTableData('handPieceCostModifyDtos')">新增</el-button>
      </el-row>
      <el-table
        :data="data.handPieceCost"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '手板件费用', null, 'quantity')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="partName" label="手板件名称" />
        <el-table-column prop="partNumber" label="料号" />
        <el-table-column prop="unitPrice" label="单价" />
        <el-table-column prop="quantity" label="数量" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row, $index }">
            <el-button link @click="handleEdit(row, $index, 'handPieceCostModifyDtos')" type="primary">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <h6>修改项：</h6>
      <el-table
        :data="data.handPieceCostModifyDtos"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '手板件费用', null, 'quantity')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="partName" label="手板件名称">
          <template #default="{ row }">
            <el-input v-model="row.partName" />
          </template>
        </el-table-column>
        <el-table-column prop="partNumber" width="175" label="料号">
          <template #default="{ row }">
            <el-input-number v-model="row.partNumber" width="175" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="unitPrice" width="175" label="单价">
          <template #default="{ row }">
            <el-input-number v-model="row.unitPrice" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="quantity" width="175" label="数量">
          <template #default="{ row }">
            <el-input-number v-model="row.quantity" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注">
          <template #default="{ row }">
            <el-input v-model="row.remark" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row }">
            <el-button link @click="handleAdditionOfCostModificationItemsForHandBoards(row)" type="primary">
              确认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="margin-top" header="模具费用">
      <el-row justify="end" m="2">
        <el-button type="primary" @click="addTableData('mouldInventoryModifyDtos')">新增</el-button>
      </el-row>
      <el-table
        :data="data.mouldInventory"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '模具费用')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="modelName" label="模具名称" />
        <el-table-column prop="moldCavityCount" label="模穴数" />
        <el-table-column prop="unitPrice" label="单价" />
        <el-table-column prop="count" label="数量" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row, $index }">
            <el-button link @click="handleEdit(row, $index, 'mouldInventoryModifyDtos')" type="primary">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <h6>修改项：</h6>
      <el-table
        :data="data.mouldInventoryModifyDtos"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '模具费用')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="modelName" label="模具名称">
          <template #default="{ row }">
            <el-input v-model="row.modelName" />
          </template>
        </el-table-column>
        <el-table-column prop="moldCavityCount" width="175" label="模穴数">
          <template #default="{ row }">
            <el-input-number v-model="row.moldCavityCount" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="unitPrice" width="175" label="单价">
          <template #default="{ row }">
            <el-input-number v-model="row.unitPrice" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="quantity" width="175" label="数量">
          <template #default="{ row }">
            <el-input-number v-model="row.quantity" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注">
          <template #default="{ row }">
            <el-input v-model="row.partName" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row }">
            <el-button link @click="handleAddMoldCostModificationItem(row)" type="primary"> 确认 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="margin-top" header="实验费用">
      <el-row justify="end" m="2">
        <el-button type="primary" @click="addTableData('experimentalExpensesModifyDtos')">新增</el-button>
      </el-row>
      <el-table
        :data="data.laboratoryFeeModels"
        style="width: 100%"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '实验费用', 'allCost')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="projectName" label="试验项目" />
        <el-table-column prop="isThirdParty" label="是否指定第三方">
          <template #default="{ row }">
            {{ row.isThirdParty ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="unitPrice" label="单价" />
        <el-table-column label="计数-摸底" prop="countBottomingOut" />
        <el-table-column label="计数-DV" prop="countDV" />
        <el-table-column label="计数-PV" prop="countPV" />
        <el-table-column prop="allCost" label="总费用" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row, $index }">
            <el-button link @click="handleEdit(row, $index, 'experimentalExpensesModifyDtos')" type="primary">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <h6>修改项：</h6>
      <el-table
        :data="data.experimentalExpensesModifyDtos"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '实验费用', 'allCost')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="projectName" label="试验项目">
          <template #default="{ row }">
            <el-input v-model="row.projectName" />
          </template>
        </el-table-column>
        <el-table-column prop="isThirdParty" label="是否指定第三方">
          <template #default="{ row }">
            <el-select v-model="row.isThirdParty">
              <el-option :value="true" label="是" />
              <el-option :value="false" label="否" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="countBottomingOut" width="175" label="计数-摸底">
          <template #default="{ row }">
            <el-input-number v-model="row.countBottomingOut" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="countDV" width="175" label="计数-DV">
          <template #default="{ row }">
            <el-input-number v-model="row.countDV" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="countPV" width="175" label="计数-PV">
          <template #default="{ row }">
            <el-input-number v-model="row.countPV" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="allCost" label="总费用" />
        <el-table-column prop="remark" label="备注">
          <template #default="{ row }">
            <el-input v-model="row.remark" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row }">
            <el-button link @click="handleAddExperimentalFeeModificationItem(row)" type="primary"> 确认 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="margin-top" header="工装费用">
      <el-descriptions m="2" border>
        <el-descriptions-item label="线体数量">{{ data.aa }}</el-descriptions-item>
        <el-descriptions-item label="共线分摊率">{{ data.bb }}</el-descriptions-item>
      </el-descriptions>
      <el-row justify="end" m="2">
        <el-button type="primary" @click="addTableData('toolingCostsModifyDtos')">新增</el-button>
      </el-row>
      <el-table
        :data="data.toolingCost"
        style="width: 100%"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '工装费用', 'cost')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="workName" label="工装名称" />
        <el-table-column prop="toolingCount" label="工装数量" />
        <el-table-column prop="unitPriceOfTooling" label="工装单价" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row, $index }">
            <el-button link @click="handleEdit(row, $index, 'toolingCostsModifyDtos')" type="primary"> 修改 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <h6>修改项：</h6>
      <el-table
        :data="data.toolingCostsModifyDtos"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '工装费用', 'cost')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="workName" label="工装名称">
          <template #default="{ row }">
            <el-input v-model="row.workName" />
          </template>
        </el-table-column>
        <el-table-column prop="toolingCount" width="175" label="工装数量">
          <template #default="{ row }">
            <el-input-number v-model="row.toolingCount" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="unitPriceOfTooling" width="175" label="工装单价">
          <template #default="{ row }">
            <el-input-number v-model="row.unitPriceOfTooling" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注">
          <template #default="{ row }">
            <el-input v-model="row.partName" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row }">
            <el-button link @click="handleAddToolingCostModificationItem(row)" type="primary"> 确认 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="margin-top" header="治具费用">
      <el-row justify="end" m="2">
        <el-button type="primary" @click="addTableData('fixtureCostsModifyDtos')">新增</el-button>
      </el-row>
      <el-table
        :data="data.fixtureCost"
        style="width: 100%"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '治具费用', 'cost')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="toolingName" label="治具名称" />
        <el-table-column prop="unitPrice" label="治具单价" />
        <el-table-column prop="number" label="治具数量" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row, $index }">
            <el-button link @click="handleEdit(row, $index, 'fixtureCostsModifyDtos')" type="primary"> 修改 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <h6>修改项：</h6>
      <el-table
        :data="data.fixtureCostsModifyDtos"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '治具费用', 'cost')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="toolingName" label="治具名称">
          <template #default="{ row }">
            <el-input v-model="row.toolingName" />
          </template>
        </el-table-column>
        <el-table-column prop="unitPrice" width="175" label="治具单价">
          <template #default="{ row }">
            <el-input-number v-model="row.unitPrice" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="number" width="175" label="治具数量">
          <template #default="{ row }">
            <el-input-number v-model="row.number" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注">
          <template #default="{ row }">
            <el-input v-model="row.partName" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row }">
            <el-button link @click="handleAdditionOfFixtureCostModificationItem(row)" type="primary"> 确认 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="margin-top" header="检具费用">
      <el-row justify="end" m="2">
        <el-button type="primary" @click="addTableData('inspectionToolCostModifyDtos')">新增</el-button>
      </el-row>
      <el-table
        :data="data.qaqcDepartments"
        style="width: 100%"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '检具费用', 'cost')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="qc" label="检具名称" />
        <el-table-column prop="unitPrice" label="检具单价" />
        <el-table-column prop="count" label="检具数量" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row, $index }">
            <el-button link @click="handleEdit(row, $index, 'inspectionToolCostModifyDtos')" type="primary">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <h6>修改项：</h6>
      <el-table
        :data="data.inspectionToolCostModifyDtos"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '检具费用', 'cost')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="qc" label="检具名称">
          <template #default="{ row }">
            <el-input v-model="row.qc" />
          </template>
        </el-table-column>
        <el-table-column prop="unitPrice" width="175" label="检具单价">
          <template #default="{ row }">
            <el-input-number v-model="row.unitPrice" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="number" width="175" label="检具数量">
          <template #default="{ row }">
            <el-input-number v-model="row.number" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注">
          <template #default="{ row }">
            <el-input v-model="row.partName" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row }">
            <el-button link @click="handleAddInspectionToolCostModificationItem(row)" type="primary"> 确认 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="margin-top" header="生产设备费用">
      <el-row justify="end" m="2">
        <el-button type="primary" @click="addTableData('productionEquipmentCostsModifyDtos')">新增</el-button>
      </el-row>
      <el-table
        :data="data.productionEquipmentCost"
        style="width: 100%"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '生产设备费用', 'cost')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="equipmentName" label="生产设备名" />
        <el-table-column prop="equipmentName" label="生产设备状态" />
        <el-table-column prop="unitPrice" label="单价" />
        <el-table-column prop="number" label="数量" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row, $index }">
            <el-button link @click="handleEdit(row, $index, 'inspectionToolCostModifyDtos')" type="primary">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <h6>修改项：</h6>
      <el-table
        :data="data.productionEquipmentCostsModifyDtos"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '生产设备费用', 'cost')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="equipmentName" label="生产设备名">
          <template #default="{ row }">
            <el-input v-model="row.equipmentName" />
          </template>
        </el-table-column>
        <el-table-column prop="unitPrice" width="175" label="单价">
          <template #default="{ row }">
            <el-input-number v-model="row.unitPrice" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="number" width="175" label="数量">
          <template #default="{ row }">
            <el-input-number v-model="row.number" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注">
          <template #default="{ row }">
            <el-input v-model="row.partName" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row }">
            <el-button link @click="handleAddProductionEquipmentCostModificationItem(row)" type="primary">
              确认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="margin-top" header="测试软件费用">
      <el-row justify="end" m="2">
        <el-button type="primary" @click="addTableData('testingSoftwareCostsModifyDtos')">新增</el-button>
      </el-row>
      <el-table
        :data="data.softwareTestingCost"
        style="width: 100%"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '测试软件费用', 'cost')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="softwareProject" label="软件项目" />
        <el-table-column prop="costH" label="费用/H" />
        <el-table-column prop="hour" label="小时" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row, $index }">
            <el-button link @click="handleEdit(row, $index, 'inspectionToolCostModifyDtos')" type="primary">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <h6>修改项：</h6>
      <el-table
        :data="data.testingSoftwareCostsModifyDtos"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '测试软件费用', 'cost')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="softwareProject" label="软件项目">
          <template #default="{ row }">
            <el-input v-model="row.softwareProject" />
          </template>
        </el-table-column>
        <el-table-column prop="costH" width="175" label="费用/H">
          <template #default="{ row }">
            <el-input-number v-model="row.costH" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="hour" width="175" label="小时">
          <template #default="{ row }">
            <el-input-number v-model="row.hour" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注">
          <template #default="{ row }">
            <el-input v-model="row.partName" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row }">
            <el-button link @click="handleAddingModificationItemsForTestingSoftwareCosts(row)" type="primary">
              确认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="margin-top" header="差旅费用">
      <el-row justify="end" m="2">
        <el-button type="primary" @click="addTableData('travelExpenseModifyDtos')">新增</el-button>
      </el-row>
      <el-table
        :data="data.travelExpense"
        style="width: 100%"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '差旅费用', 'cost')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="reasonsId" label="事由">
          <template #default="{ row }">
            <el-select v-model="row.reasonsId" disabled>
              <el-option v-for="item in nreResonOptions" :key="item.id" :label="item.displayName" :value="item.id" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="peopleCount" label="人数" />
        <el-table-column prop="costSky" label="费用/天" />
        <el-table-column prop="skyCount" label="天数" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row, $index }">
            <el-button link @click="handleEdit(row, $index, 'travelExpenseModifyDtos')" type="primary">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <h6>修改项：</h6>
      <el-table
        :data="data.travelExpenseModifyDtos"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '差旅费用', 'cost')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="reasonsId" label="事由">
          <template #default="{ row }">
            <el-select v-model="row.reasonsId">
              <el-option v-for="item in nreResonOptions" :key="item.id" :label="item.displayName" :value="item.id" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="peopleCount" width="175" label="人数">
          <template #default="{ row }">
            <el-input-number v-model="row.peopleCount" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="costSky" width="175" label="费用/天">
          <template #default="{ row }">
            <el-input-number v-model="row.costSky" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="skyCount" width="175" label="天数">
          <template #default="{ row }">
            <el-input-number v-model="row.skyCount" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注">
          <template #default="{ row }">
            <el-input v-model="row.remark" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row }">
            <el-button link @click="handleAddTravelExpenseModificationItem(row)" type="primary"> 确认 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="margin-top" header="其他费用">
      <el-row justify="end" m="2">
        <el-button type="primary" @click="addTableData('restsCostModifyDtos')">新增</el-button>
      </el-row>
      <el-table
        :data="data.restsCost"
        style="width: 100%"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '其他费用', 'cost')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="constName" label="费用类型" />
        <el-table-column prop="cost" label="费用" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row, $index }">
            <el-button link @click="handleEdit(row, $index, 'restsCostModifyDtos')" type="primary"> 修改 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <h6>修改项：</h6>
      <el-table
        :data="data.restsCostModifyDtos"
        border
        :summary-method="(val: any) => getMouldSummaries(val, '其他费用', 'cost')"
        show-summary
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="constName" label="费用类型">
          <template #default="{ row }">
            <el-input v-model="row.constName" />
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="费用">
          <template #default="{ row }">
            <el-input-number v-model="row.cost" controls-position="right" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <template #default="{ row }">
            <el-input v-model="row.partName" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="160">
          <template #default="{ row }">
            <el-button link @click="handleOtherExpenseModificationItemsAdded(row)" type="primary"> 确认 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-descriptions m="4" :column="1" border>
      <el-descriptions-item label="（不含税人民币）NRE 总费用">{{
        formatThousandths(data.rmbAllCost)
      }}</el-descriptions-item>
      <el-descriptions-item label="（不含税美金）NRE 总费用">{{
        formatThousandths(data.usdAllCost)
      }}</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, watchEffect, ref, watch } from "vue"
import {
  GetPricingForm,
  NreTableDownload,
  AdditionOfCostModificationItemsForHandBoards,
  AddMoldCostModificationItem,
  AddToolingCostModificationItem,
  AdditionOfFixtureCostModificationItem,
  AddInspectionToolCostModificationItem,
  AddProductionEquipmentCostModificationItem,
  AddExperimentalFeeModificationItem,
  AddingModificationItemsForTestingSoftwareCosts,
  AddTravelExpenseModificationItem,
  OtherExpenseModificationItemsAdded
} from "./common/request"
import { getMouldSummaries } from "./common/mouldSummaries"
import getQuery from "@/utils/getQuery"
import { formatDateTime, downloadFileExcel } from "@/utils"
import { getDictionaryAndDetail } from "@/api/dictionary"
import { ElMessage } from "element-plus"

const { auditFlowId, productId, year, hideBtn }: any = getQuery()

const data = ref<any>({
  handPieceCost: [],
  handPieceCostModifyDtos: [],
  mouldInventory: [],
  qaqcDepartments: [],
  laboratoryFeeModels: [],
  travelExpense: [],
  restsCost: [],
  toolingCost: [],
  fixtureCost: [],
  productionEquipmentCost: [],
  softwareTestingCost: [],
  rmbAllCost: 0,
  usdAllCost: 0
})

watch(
  () => data.value,
  (val) => {
    // 手板件
    if (data.value.handPieceCostModifyDtos.length) {
      data.value.handPieceCostModifyDtos.forEach((item: any) => {
        item.cost = item.unitPrice * item.quantity
      })
    }
    // 模具
    if (data.value.mouldInventoryModifyDtos.length) {
      data.value.mouldInventoryModifyDtos.forEach((item: any) => {
        console.log(item, "item123123")
        item.cost = (item.unitPrice || 0) * (item.quantity || 0)
      })
    }
    // 工装
    if (data.value.toolingCostsModifyDtos.length) {
      data.value.toolingCostsModifyDtos.forEach((item: any) => {
        item.cost = (item.toolingCount || 0) * (item.unitPriceOfTooling || 0)
      })
    }
    // 治具
    if (data.value.fixtureCostsModifyDtos.length) {
      data.value.fixtureCostsModifyDtos.forEach((item: any) => {
        item.cost = (item.number || 0) * (item.unitPrice || 0) // to-do 缺少线体数量和共线分摊率
      })
    }
    // 检具
    if (data.value.inspectionToolCostModifyDtos.length) {
      data.value.inspectionToolCostModifyDtos.forEach((item: any) => {
        item.cost = (item.count || 0) * (item.unitPrice || 0) // to-do 缺少线体数量和共线分摊率
      })
    }
    // 生产设备
    if (data.value.productionEquipmentCostsModifyDtos.length) {
      data.value.productionEquipmentCostsModifyDtos.forEach((item: any) => {
        item.cost = (item.count || 0) * (item.unitPrice || 0)// to-do 缺少线体数量和共线分摊率 缺少设备状态
      })
    }
    // 实验费
    if (data.value.experimentalExpensesModifyDtos.length) {
      data.value.experimentalExpensesModifyDtos.forEach((item: any) => {
        item.allCost = (item.countBottomingOut || 0) * (item.countDV || 0) * (item.countPV || 0)
      })
    }
    // 测试软件
    if (data.value.testingSoftwareCostsModifyDtos.length) {
      data.value.testingSoftwareCostsModifyDtos.forEach((item: any) => {
        item.cost = (item.costH || 0) * (item.hour || 0)
      })
    }
    // 差旅费用修改项
    if (data.value.travelExpenseModifyDtos.length) {
      data.value.travelExpenseModifyDtos.forEach((item: any) => {
        item.cost = (item.skyCount || 0) * (item.costSky || 0) * (item.peopleCount || 0)
      })
    }
  },
  {
    deep: true
  }
)

const nreResonOptions = ref<any[]>([])

const initFetch = async () => {
  try {
    const { success, result } = await GetPricingForm({ auditFlowId, solutionId: productId })
    if (!success) throw Error()
    console.log(result, "result")
    data.value = result
  } catch (err) {
    console.log(err, "[ GetPricingForm err ]")
  }
}

// NRE核价表下载
const handleFethNreTableDownload = async () => {
  try {
    const res: any = await NreTableDownload({
      Year: year,
      AuditFlowId: auditFlowId,
      ModelCountId: productId
    })
    downloadFileExcel(res, "NRE核价表")
    ElMessage.success("下载成功！")
    console.log(res, "NreTableDownload")
  } catch (err: any) {
    console.log(err, "[ NRE核价表下载 失败 ]")
  }
}

// 修改
const handleEdit = (row: any, index: number, key: string) => {
  const findItemIndex = data.value[key]?.findIndex((item: any) => item.modifyId === row.id)
  console.log(findItemIndex, "currentItem")
  if (!data.value[key]?.length || findItemIndex === -1) {
    data.value[key].push({
      ...row,
      modifyId: row.id
    })
  }
  console.log(data.value[key], "data[key]")
}

const formatThousandths = (cellValue: any) => {
  return (cellValue.toFixed(2) + "").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,")
}

const getResonOptions = async () => {
  let nreReasons: any = await getDictionaryAndDetail("NreReasons") //落地工厂
  nreResonOptions.value = nreReasons.result.financeDictionaryDetailList
}

const addTableData = (key: string) => {
  data.value[key].push({ cost: 0 })
}

const handleAdditionOfCostModificationItemsForHandBoards = async (row: any) => {
  const res = await AdditionOfCostModificationItemsForHandBoards({
    ...row,
    auditFlowId,
    solutionId: productId
  })
}

const handleAddMoldCostModificationItem = async (row: any) => {
  const res = await AddMoldCostModificationItem({
    ...row,
    auditFlowId,
    solutionId: productId
  })
}

const handleAddToolingCostModificationItem = async (row: any) => {
  const res =
    (await AddToolingCostModificationItem({
      ...row,
      auditFlowId,
      solutionId: productId
    })) || {}
}

const handleAdditionOfFixtureCostModificationItem = async (row: any) => {
  const res =
    (await AdditionOfFixtureCostModificationItem({
      ...row,
      auditFlowId,
      solutionId: productId
    })) || {}
}

const handleAddInspectionToolCostModificationItem = async (row: any) => {
  const res =
    (await AddInspectionToolCostModificationItem({
      ...row,
      auditFlowId,
      solutionId: productId
    })) || {}
}

const handleAddProductionEquipmentCostModificationItem = async (row: any) => {
  const res =
    (await AddProductionEquipmentCostModificationItem({
      ...row,
      auditFlowId,
      solutionId: productId
    })) || {}
}

const handleAddExperimentalFeeModificationItem = async (row: any) => {
  const res =
    (await AddExperimentalFeeModificationItem({
      ...row,
      auditFlowId,
      solutionId: productId
    })) || {}
}

const handleAddingModificationItemsForTestingSoftwareCosts = async (row: any) => {
  const res =
    (await AddingModificationItemsForTestingSoftwareCosts({
      ...row,
      auditFlowId,
      solutionId: productId
    })) || {}
}

const handleAddTravelExpenseModificationItem = async (row: any) => {
  const res =
    (await AddTravelExpenseModificationItem({
      ...row,
      auditFlowId,
      solutionId: productId
    })) || {}
}

const handleOtherExpenseModificationItemsAdded = async (row: any) => {
  const res =
    (await OtherExpenseModificationItemsAdded({
      ...row,
      auditFlowId,
      solutionId: productId
    })) || {}
}

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})

onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  initFetch()
  getResonOptions()
})

watchEffect(() => {})
</script>
<style scoped lang="scss">
.margin-top {
  margin-top: 20px;
}
</style>
